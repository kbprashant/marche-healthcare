# PowerShell script to allow Vite and API server through Windows Firewall
# Run this as Administrator

Write-Host "Adding Windows Firewall rules for development servers..." -ForegroundColor Green

# Allow Vite dev server (port 3000)
New-NetFirewallRule -DisplayName "Vite Dev Server (Port 3000)" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow -ErrorAction SilentlyContinue
Write-Host "✓ Allowed port 3000 (Vite)" -ForegroundColor Cyan

# Allow API server (port 8080)
New-NetFirewallRule -DisplayName "Marche API Server (Port 8080)" -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow -ErrorAction SilentlyContinue
Write-Host "✓ Allowed port 8080 (API)" -ForegroundColor Cyan

Write-Host "`nFirewall rules added successfully!" -ForegroundColor Green
Write-Host "You can now access your app from mobile at:" -ForegroundColor Yellow
Write-Host "http://192.168.1.41:3000" -ForegroundColor White
