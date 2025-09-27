// Shared client-side search index using FlexSearch Document
// Loads public/search-index.json lazily and builds an in-memory index
// Exports small helpers to check/load/search

import { Document } from 'flexsearch';

const FLEX_OPTIONS = {
  encode: 'icase',
  tokenize: 'full',
  threshold: 0,
  resolution: 9,
  depth: 2,
};

function getState() {
  if (typeof window === 'undefined') return {};
  window.__clientSearch = window.__clientSearch || {
    ready: false,
    loading: false,
    docs: [],
    index: null,
    error: null,
  };
  return window.__clientSearch;
}

export function isClientSearchReady() {
  const s = getState();
  return !!s.ready && !!s.index && s.docs.length > 0;
}

function publicUrl(path) {
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
  const a = String(base).replace(/\/+$/,'');
  const b = String(path || '').replace(/^\/+/, '');
  return `${a}/${b}`;
}

export async function loadClientSearch() {
  const s = getState();
  if (s.ready || s.loading) return s;
  s.loading = true;
  try {
    const res = await fetch(publicUrl('search-index.json'), { cache: 'no-cache' });
    if (!res.ok) throw new Error('search-index.json not found');
    const items = await res.json();
    const normalized = (items || []).map((d, i) => {
      const n = { ...d };
      n.__sid = d.id !== undefined && d.id !== null ? String(d.id) : `doc_${i}`;
      n.text = (n.text || n.body || n.summary || '').toString();
      n.type = (n.type || 'page').toLowerCase();
      return n;
    });
    const idx = new Document({
      document: {
        id: 'sid',
        index: ['title', 'text'],
        store: ['title', 'path', 'excerpt', 'type', 'sid'],
      },
      ...FLEX_OPTIONS,
    });
    normalized.forEach((d) => {
      const rec = {
        sid: d.__sid,
        title: d.title || '',
        text: d.text || '',
        path: d.path || '',
        excerpt: d.excerpt || (d.text || '').slice(0, 300),
        type: d.type,
      };
      idx.add(rec);
    });
    s.docs = normalized;
    s.index = idx;
    s.ready = true;
  } catch (e) {
    console.warn('Client search load failed:', e);
    s.error = e;
  } finally {
    s.loading = false;
  }
  return s;
}

export async function ensureClientSearchLoaded() {
  const s = getState();
  if (s.ready) return s;
  return loadClientSearch();
}

export function searchClient(query, { types, limit = 10 } = {}) {
  const s = getState();
  if (!s.ready || !s.index || !query || !query.trim()) return [];
  try {
    const q = query.trim();
    // try exact first, then prefix expansion for the last token
    let results = s.index.search(q, { enrich: true });
    if (!results || results.length === 0) {
      const parts = q.split(/\s+/);
      const last = parts.pop();
      if (last && last.length >= 2) {
        const prefix = last.toLowerCase();
        // do a simple prefix scan by trying a few common endings
        const tries = [prefix, `${prefix}*`];
        for (const t of tries) {
          results = s.index.search(`${[...parts, t].join(' ')}`.trim(), { enrich: true });
          if (results && results.length) break;
        }
      }
    }
    const sidSet = new Set();
    results.forEach((group) => {
      (group.result || []).forEach((r) => {
        (r.result || []).forEach((sid) => sidSet.add(sid));
      });
    });
    let matches = [...sidSet]
      .map((sid) => s.docs.find((d) => d.__sid === sid))
      .filter(Boolean);
    // text-contains fallback if the index had no hits
    if (matches.length === 0) {
      const qlc = q.toLowerCase();
      matches = (s.docs || []).filter((d) =>
        (d.title || '').toLowerCase().includes(qlc) ||
        (d.text || '').toLowerCase().includes(qlc)
      );
    }
    if (Array.isArray(types) && types.length) {
      const allow = new Set(types.map((t) => String(t).toLowerCase()));
      matches = matches.filter((m) => allow.has((m.type || 'page').toLowerCase()));
    }
    const mapped = matches.map((m) => ({
      type: m.type || 'page',
      title: m.title || '',
      path: m.path || '',
      excerpt: m.excerpt || (m.text || '').slice(0, 220),
    }));
    return mapped.slice(0, limit);
  } catch (e) {
    console.warn('Client search failed:', e);
    return [];
  }
}

export function getClientDocs() {
  const s = getState();
  return s.docs || [];
}
