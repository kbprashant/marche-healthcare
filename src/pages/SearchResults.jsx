// src/pages/SearchResults.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Layouts } from "../Layouts/Layouts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/searchresults.css";
// use named Document export
import { Document } from "flexsearch";
import FlexSearch from "flexsearch";


// === DB API (env driven) - match NewsPage style ===
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  `${window.location.protocol}//${window.location.host}/api`;

// helper: make URLs absolute the same way NewsPage does
const apiOrigin = (API_BASE.startsWith("http")
  ? new URL(API_BASE)
  : new URL(API_BASE, window.location.origin)
).origin;
const abs = (u) => (u && /^https?:\/\//i.test(u) ? u : `${apiOrigin}${u || ""}`);

function stripHtml(input = "") {
  try {
    return String(input).replace(/<\/?[^>]+(>|$)/g, "");
  } catch {
    return String(input || "");
  }
}

const menuItems = [
  { title: "Home", path: "/" },
  { title: "About — Story", path: "/about#ourstory" },
  { title: "About — Purpose", path: "/about#ourpurpose" },
  { title: "About — Mission", path: "/about#ourmission" },
  { title: "About — Vision", path: "/about#ourvision" },
  { title: "Products", path: "/products" },
  { title: "Videos", path: "/videos" },
  { title: "Broadcast (Social)", path: "/news#socialmedia" },
  { title: "Broadcast (News & Events)", path: "/news#newsandevents" },
  { title: "Careers", path: "/careers" },
  { title: "Contact", path: "/contact" },
];

// safer FlexSearch options to avoid encoder issues
const FLEX_OPTIONS = {
  // "icase" is safe across builds; "raw" caused the error you saw in some bundles
  encode: "icase",
  // keep tokenization broad so every word is searchable
  tokenize: "full",
  threshold: 0,
  resolution: 9,
  depth: 2,
};

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const qParam = params.get("q") || "";
  const [query, setQuery] = useState(qParam);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [broadcasts, setBroadcasts] = useState([]);
  const [pageIndex, setPageIndex] = useState([]); // pages loaded from search-index.json (type === 'page')
  const [filteredBroadcasts, setFilteredBroadcasts] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);

  // FlexSearch in-memory structures
  const [index, setIndex] = useState(null); // Document instance
  const [docs, setDocs] = useState([]); // raw docs array loaded from search-index.json

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 8;

  // load static page index (search-index.json) and build FlexSearch index
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/search-index.json", { cache: "no-cache" });
        if (!res.ok) {
          console.warn("search-index.json not found");
          return;
        }
        const items = await res.json();
        if (!alive) return;

        // normalize docs and add stable id __sid for lookup
        const normalized = (items || []).map((d, i) => {
          const clone = { ...d };
          clone.__sid = d.id !== undefined && d.id !== null ? String(d.id) : `doc_${i}`;
          clone.text = (clone.text || clone.body || clone.summary || "").toString();
          return clone;
        });

        setDocs(normalized);
        const pagesOnly = normalized.filter((p) => (p.type || "").toLowerCase() === "page");
        setPageIndex(pagesOnly);

        // build FlexSearch Document index using named Document
        const idx = new Document({
          document: {
            id: "sid", // name of id used inside added objects
            index: ["title", "text"],
            store: ["title", "path", "excerpt", "type", "meta", "sid"],
          },
          ...FLEX_OPTIONS,
        });

        normalized.forEach((d) => {
          const docForIndex = {
            sid: d.__sid,
            title: d.title || "",
            text: d.text || "",
            path: d.path || "",
            excerpt: d.excerpt || ((d.text || "").slice ? (d.text || "").slice(0, 300) : ""),
            type: d.type || "page",
            meta: d.meta || null,
          };
          // add to index
          idx.add(docForIndex);
        });

        setIndex(idx);
      } catch (e) {
        console.error("Failed to load search index:", e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // fetch broadcasts dynamically when a search is performed (keep original behavior)
  useEffect(() => {
    if (!query || !query.trim()) {
      setFilteredBroadcasts([]);
      setFilteredPages([]);
      return;
    }

    let active = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/public/broadcasts?limit=200`, { cache: "no-store" });
        const ctype = res.headers.get("content-type") || "";
        if (!ctype.includes("application/json")) {
          setError("Search service not available (unexpected response).");
          setBroadcasts([]);
          setFilteredBroadcasts([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const items = Array.isArray(data.items) ? data.items : data.items ? [data.items] : [];
        if (!active) return;
        setBroadcasts(items);
      } catch (err) {
        console.error("Search fetch failed:", err);
        setError("Failed to fetch content for search.");
        setBroadcasts([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [query]);

  // run search when query, index or docs change
  useEffect(() => {
    if (!query || !query.trim()) {
      setFilteredBroadcasts([]);
      setFilteredPages([]);
      return;
    }

    const needle = query.trim();

    // 1) search the index (if available)
    let matchedPages = [];
    if (index && docs.length) {
      try {
        const results = index.search(needle, { enrich: true });
        const sidSet = new Set();
        results.forEach((resGroup) => {
          (resGroup.result || []).forEach((r) => {
            (r.result || []).forEach((sid) => sidSet.add(sid));
          });
        });
        const matched = [...sidSet].map((sid) => docs.find((d) => d.__sid === sid)).filter(Boolean);
        matchedPages = matched.filter((m) => (m.type || "page").toLowerCase() === "page");
      } catch (e) {
        console.warn("FlexSearch search error:", e);
        matchedPages = [];
      }
    }

    // 2) search broadcasts (client-side filter)
    const needleLc = needle.toLowerCase();
    const matchedB = (broadcasts || []).filter((b) => {
      const title = (b.title || "").toLowerCase();
      const summary = (b.summary || "").toLowerCase();
      const body = stripHtml(b.body_html || "").toLowerCase();
      return (
        title.includes(needleLc) ||
        summary.includes(needleLc) ||
        body.includes(needleLc) ||
        (b.tag || "").toLowerCase().includes(needleLc)
      );
    });

    setFilteredPages(matchedPages);
    setFilteredBroadcasts(matchedB);
    setPage(1);
  }, [query, index, docs, broadcasts]);

  // combined results for count and pagination (pages first, then broadcasts)
  const combined = useMemo(() => {
    const pagesAsResults = (filteredPages || []).map((p) => ({
      type: "page",
      id: p.path || p.title || p.__sid,
      title: p.title,
      path: p.path,
      excerpt: (p.text || "").slice(0, 300),
    }));
    const broadcastAsResults = (filteredBroadcasts || []).map((b) => ({
      type: "broadcast",
      id: b.id,
      title: b.title,
      excerpt: b.summary || stripHtml(b.body_html || "").slice(0, 300),
      date: (b.scheduled_at || b.created_at || "").slice(0, 10),
      image: abs(b.image_url || ""),
      link: b.link,
      raw: b,
    }));
    return [...pagesAsResults, ...broadcastAsResults];
  }, [filteredBroadcasts, filteredPages]);

  const total = combined.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const shown = combined.slice((page - 1) * perPage, page * perPage);

  function onSubmitSearch(e) {
    e.preventDefault();
    const q = (query || "").trim();
    navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true });
    setQuery(q);
  }

  function openResult(r) {
    if (r.type === "broadcast") {
      navigate("/news", { state: { openId: r.id } });
    } else if (r.type === "page" && r.path) {
      navigate(r.path);
    }
  }

  return (
    <Layouts title={`Search: ${query || ""}`}>
      <div className="sr-topwrap">
        <div className="sr-inner">
          <form className="sr-searchbar" onSubmit={onSubmitSearch} role="search" aria-label="Site search">
            <input
              className="sr-input"
              placeholder="Search the site…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" className="sr-btn">Search</button>
          </form>

          <div className="sr-meta">
            <div className="sr-count">
              {query ? <><strong>{total.toLocaleString()}</strong> results</> : "Type to start searching"}
            </div>
            <div className="sr-filters">
              <button className="chip">Categories ▾</button>
              <button className="chip">Dates ▾</button>
              <button className="chip">Types ▾</button>
            </div>
          </div>

          <div className="sr-results">
            {loading && <div className="sr-loading">Searching…</div>}
            {error && <div className="sr-error">{error}</div>}

            {!loading && shown.length === 0 && query && <div className="sr-empty">No results found.</div>}

            {shown.map((r) => (
              <div key={r.id} className="sr-card" onClick={() => openResult(r)} role="button" tabIndex={0}>
                {r.type === "broadcast" ? (
                  <>
                    <div className="sr-thumb-wrap">
                      <img src={r.image || "./news/blog1.png"} alt={r.title} className="sr-thumb" />
                    </div>
                    <div className="sr-body">
                      <div className="sr-tag">Broadcast</div>
                      <h3 className="sr-title">{r.title}</h3>
                      <div className="sr-date">{r.date}</div>
                      <p className="sr-excerpt">{r.excerpt}{r.excerpt && r.excerpt.length >= 300 ? "…" : ""}</p>
                      <div className="sr-actions">
                        <button className="sr-read" onClick={(e) => { e.stopPropagation(); openResult(r); }}>Read more →</button>
                        {r.link ? (<a className="sr-external" href={r.link} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>External</a>) : null}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sr-thumb-wrap small">
                      <div className="sr-page-icon">📄</div>
                    </div>
                    <div className="sr-body">
                      <div className="sr-tag">Page</div>
                      <h3 className="sr-title">{r.title}</h3>
                      <div className="sr-path">{r.path}</div>
                      <p className="sr-excerpt">{r.excerpt}</p>
                      <div className="sr-actions">
                        <button className="sr-read" onClick={(e) => { e.stopPropagation(); openResult(r); }}>Open page →</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="sr-pagination">
            <div className="sr-pager">
              <button disabled={page === 1} onClick={() => setPage(1)} className="pager-btn">« First</button>
              <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="pager-btn">‹ Prev</button>

              <div className="pager-pages">
                Page <strong>{page}</strong> of {pages}
              </div>

              <button disabled={page === pages} onClick={() => setPage((p) => Math.min(pages, p + 1))} className="pager-btn">Next ›</button>
              <button disabled={page === pages} onClick={() => setPage(pages)} className="pager-btn">Last »</button>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
}
