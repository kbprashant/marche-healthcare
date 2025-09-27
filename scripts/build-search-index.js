// Build-time indexer: extracts rough text from key page components
// and writes public/search-index.json so the client search can find content
// Works with package.json "type":"module"

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');

// Map routes to page component files
const PAGES = [
  { path: '/', file: 'pages/HomePage.jsx', title: 'Home' },
  { path: '/about', file: 'pages/AboutPage.jsx', title: 'About' },
  { path: '/products', file: 'pages/ProductPage.jsx', title: 'Products' },
  { path: '/videos', file: 'pages/VideoPage.jsx', title: 'Videos' },
  { path: '/news', file: 'pages/NewsPage.jsx', title: 'Broadcast' },
  { path: '/careers', file: 'pages/careers.jsx', title: 'Careers' },
  { path: '/careersapply', file: 'pages/careersapply.jsx', title: 'Careers Apply' },
  { path: '/contact', file: 'pages/ContactPage.jsx', title: 'Contact' },
  { path: '/Privacy-Policy', file: 'pages/PrivacyPolicy.jsx', title: 'Privacy Policy' },
  { path: '/TermsCondition', file: 'pages/TermsCondition.jsx', title: 'Terms & Conditions' },
  { path: '/Incubation', file: 'pages/Incubation.jsx', title: 'Incubation' },
  { path: '/Investor', file: 'pages/Investor.jsx', title: 'Investor' },
  { path: '/Journal', file: 'pages/Journal.jsx', title: 'Journal' },
  { path: '/NewsEvent', file: 'pages/NewsEvent.jsx', title: 'News & Events' },
];

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return '';
  }
}

// Extract human-readable text from a JSX/JS file.
// Strategy:
// 1) Remove comments and obvious code-only lines (import/export).
// 2) Collect text nodes between JSX tags: >text<
// 3) Collect string literals, filtering out paths, URLs, filenames, and short/codey tokens.
// 4) Join and normalize whitespace.
function extractTextFromJsx(src) {
  if (!src) return '';
  let s = String(src);

  // remove block and line comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, ' ');
  s = s.replace(/(^|\n)\s*\/\/[^\r\n]*[\r\n]/g, '$1');
  // remove import/export lines
  s = s.replace(/^\s*import[^\n]*$/gm, ' ');
  s = s.replace(/^\s*export[^\n]*$/gm, ' ');

  // 1) text between JSX tags (avoid braces/angle brackets)
  const between = [];
  const reBetween = />[^<>{}]+</g; // matches ...>TEXT<...
  let m;
  while ((m = reBetween.exec(s)) !== null) {
    const chunk = m[0].slice(1, -1); // remove leading '>' and trailing '<'
    const t = chunk.replace(/\s+/g, ' ').trim();
    if (isReadable(t)) between.push(t);
  }

  // 2) string literals (single or double quotes), keep only likely human text
  const strLits = [];
  const reStr = /(['"])((?:\\.|(?!\1).)*?)\1/g; // quoted strings
  while ((m = reStr.exec(s)) !== null) {
    const t = (m[2] || '').trim();
    if (!t) continue;
    if (isReadable(t, { allowSingleWord: true })) strLits.push(t);
  }

  const all = [...between, ...strLits];
  const text = all.join(' ').replace(/\s+/g, ' ').trim();
  return text;
}

function isReadable(t, opts = {}) {
  const { allowSingleWord = false } = opts;
  if (!t) return false;
  if (!/[A-Za-z]/.test(t)) return false;
  const stripped = t.replace(/\s+/g, ' ').trim();
  if (stripped.length < 10) return false;
  if (!allowSingleWord && !/\s/.test(stripped)) return false;
  // reject code-like and svg path-like
  if (/\$\{[^}]+\}/.test(stripped)) return false;
  if (/[A-Za-z_$][A-Za-z0-9_$]*\s*[=:{(]/.test(stripped)) return false;
  if (/(?:&&|\|\||\?\s*:)/.test(stripped)) return false;
  if (/(?:\bwindow\b|\bdocument\b|\binnerWidth\b|\baddEventListener\b|\bremoveEventListener\b|\bfetch\b|\bnavigate\b|\buseState\b|\buseEffect\b)/.test(stripped)) return false;
  if (/^[-\d\s.,]+$/.test(stripped)) return false;
  if (/^[MLCQAHVSTZmlcqahvstz0-9\s.,-]+$/.test(stripped)) return false; // svg path-ish
  if (/(?:noopener|noreferrer|SVGRepo|0 0 24 24)/i.test(stripped)) return false;
  // filter common asset/paths/urls
  if (/^(?:\.\.?\/|#|@|data:|https?:|tel:|mailto:)/i.test(stripped)) return false;
  if (/\.(jsx?|tsx?|css|png|jpe?g|svg|webp|mp4|mov|json|pdf|ico)$/i.test(stripped)) return false;
  if (/^[A-Za-z0-9_-]+\.(?:com|org|net|io|dev)(?:\/.+)?$/i.test(stripped)) return false;
  // ensure enough letters vs non-letters
  const letters = (stripped.match(/[A-Za-z]/g) || []).length;
  const nonLetters = stripped.length - letters;
  if (letters / (nonLetters + 1) < 0.35) return false;
  return true;
}

function makeExcerpt(text, min = 60, max = 220) {
  if (!text) return '';
  const parts = String(text)
    .replace(/\s+/g, ' ')
    .split(/(?<=[\.!?])\s+/);
  for (const p of parts) {
    const s = p.trim();
    if (s.length >= min && s.length <= max && /[A-Za-z]/.test(s) && isReadable(s, { allowSingleWord: true })) return s;
  }
  for (const p of parts) {
    const s = p.trim();
    if (s.length > 20 && isReadable(s, { allowSingleWord: true })) return s.slice(0, max);
  }
  const first = parts.find((p) => /[A-Za-z]/.test(p)) || text;
  return String(first).trim().slice(0, max);
}

function build() {
  const items = [];
  for (const p of PAGES) {
    const absFile = path.join(srcDir, p.file);
    const raw = read(absFile);
    const text = extractTextFromJsx(raw);
    if (!text) continue;
    items.push({
      title: p.title,
      path: p.path,
      text,
      excerpt: makeExcerpt(text),
      type: 'page',
    });
  }

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  const outFile = path.join(publicDir, 'search-index.json');
  fs.writeFileSync(outFile, JSON.stringify(items, null, 2), 'utf8');
  console.log(`search-index.json written with ${items.length} items.`);
}

try {
  build();
} catch (e) {
  console.warn('build-search-index failed:', e.message);
  process.exitCode = 0;
}
