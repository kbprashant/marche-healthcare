# Production Deployment Guide

## Overview
The production build serves both frontend and backend from a single Express server on port 8080.

## Changes Made

### 1. Updated [marche-api/src/server.js](marche-api/src/server.js)
- Added static file serving with proper MIME types for JavaScript modules
- Added SPA fallback routing to serve index.html for non-API routes
- Only active when `NODE_ENV=production`

### 2. Updated [marche-api/Dockerfile](marche-api/Dockerfile)
- Multi-stage build: builds frontend, then bundles with backend
- **Important**: Docker build context must be the project root, not `marche-api/`

### 3. Created `.dockerignore`
- Excludes development files and node_modules from Docker context

## Building for Production

### Local Build Test
```bash
# From project root
docker build -f marche-api/Dockerfile -t marche-healthcare .
docker run -p 8080:8080 --env-file marche-api/.env marche-healthcare
```

### Coolify/Production Deployment

#### Build Configuration
- **Build Context**: Project root (`/`)
- **Dockerfile Path**: `marche-api/Dockerfile`
- **Port**: `8080`

#### Environment Variables
Ensure these are set in production:
```env
NODE_ENV=production
DATABASE_URL=postgres://user:pass@host:5432/marche
ALLOWED_ORIGINS=https://yourdomain.com
PORT=8080
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
FILE_UPLOAD_DIR=/app/uploads
```

## How It Works

### Development (Local)
- Frontend: Vite dev server on http://localhost:3000
- Backend: Express API on http://localhost:8080
- Run with: `npm run dev` (frontend) + `cd marche-api && npm run dev` (backend)

### Production
- Single Express server on port 8080 serves:
  - Static files (HTML, JS, CSS) from `/dist`
  - API endpoints on `/api/*`
  - Uploaded files on `/uploads/*`
- Built with multi-stage Docker
- MIME types explicitly set to fix module script errors

## Troubleshooting

### MIME Type Error in Production
This was caused by Express not setting correct MIME types for JavaScript modules. Fixed by:
1. Explicit `setHeaders` in `express.static()` configuration
2. Setting `Content-Type: application/javascript` for `.js` and `.mjs` files

### 404 on Page Refresh
Fixed by SPA fallback routing - all non-API routes serve `index.html` and let React Router handle routing.

### Build Fails
- Ensure Docker build context is project root
- Check that both `package.json` files are accessible
- Verify frontend builds successfully: `npm run build`
