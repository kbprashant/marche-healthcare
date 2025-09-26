import React, { useMemo, useState } from "react";
import { Layouts } from "../Layouts/Layouts";
import "./css/journal.css";
import { motion } from "framer-motion";

/**
 * Replace placeholder entries with your real publications.
 * Fields:
 *  id: unique
 *  title: publication title
 *  platform: 'journal' | 'conference' | 'preprint' | 'media' | 'book' | etc.
 *  venue: journal / conference / platform name
 *  year: number
 *  tags: string[]
 *  summary: short teaser
 *  link: external URL (doi, platform, article page)
 *  status: 'Published' | 'In Press' | etc.
 */
const PUBLICATIONS = [
  {
    id: 1,
    title: "Enhanced Articulation in Minimally Invasive Laparoscopic Systems",
    platform: "journal",
    venue: "International Journal of Surgical Robotics",
    year: 2025,
    tags: ["Laparoscopy", "Instrumentation", "Articulation"],
    summary:
      "Describes a multi‑DoF laparoscopic system delivering robotic-like dexterity without full robotic infrastructure.",
    link: "https://example.com/journal/enhanced-articulation",
    status: "Published",
  },
  {
    id: 2,
    title: "Human Factors Evaluation of NovaLap 360 D8 Handle Ergonomics",
    platform: "conference",
    venue: "MedTech Innovators Summit",
    year: 2025,
    tags: ["Ergonomics", "Usability", "Human Factors"],
    summary:
      "Presents controlled evaluations of grip stability and fatigue reduction using redesigned finger support geometry.",
    link: "https://example.com/conference/handle-ergonomics",
    status: "Published",
  },
  {
    id: 3,
    title: "Tactile Feedback Preservation in Mechanical Laparoscopic Instruments",
    platform: "preprint",
    venue: "medRxiv",
    year: 2024,
    tags: ["Haptics", "Feedback", "Surgical Safety"],
    summary:
      "Introduces a mechanical design preserving haptic sensation while expanding rotational degrees of freedom.",
    link: "https://example.com/preprint/tactile-feedback",
    status: "Preprint",
  },
  {
    id: 4,
    title: "Cost Accessibility Pathways for Advanced MIS Platforms",
    platform: "media",
    venue: "Healthcare Technology Review",
    year: 2025,
    tags: ["Affordability", "Health Economics"],
    summary:
      "Interview + feature on strategies reducing acquisition and maintenance costs in emerging markets.",
    link: "https://example.com/media/cost-accessibility",
    status: "Featured",
  },
  {
    id: 5,
    title: "Design Verification Workflow for Multi‑Axis Surgical End‑Effectors",
    platform: "journal",
    venue: "Biomedical Engineering Advances",
    year: 2024,
    tags: ["Design Control", "Verification", "Regulatory"],
    summary:
      "Outlines a modular verification matrix enabling rapid iteration with traceable performance criteria.",
    link: "https://example.com/journal/design-verification-workflow",
    status: "Published",
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "journal", label: "Journals" },
  { key: "conference", label: "Conferences" },
  { key: "preprint", label: "Preprints" },
  { key: "media", label: "Media" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 0.9, 0.22, 1] },
  viewport: { once: true, margin: "-60px" },
});

const Journal = () => {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PUBLICATIONS.filter((p) => {
      const passFilter = filter === "all" || p.platform === filter;
      if (!passFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  }, [filter, query]);

  const stats = useMemo(() => {
    const uniquePlatforms = new Set(PUBLICATIONS.map((p) => p.platform)).size;
    const years = PUBLICATIONS.map((p) => p.year);
    const latest = years.length ? Math.max(...years) : "-";
    return {
      total: PUBLICATIONS.length,
      platforms: uniquePlatforms,
      latestYear: latest,
    };
  }, []);

  return (
    <Layouts title="Journals">
      {/* HERO */}
      <section className="journal-banner">
        <div className="journal-banner-text">
          <h3>Journals</h3>
        </div>
      </section>

      {/* STATS */}
      <section className="journals-stats">
        <div className="stats-wrap">
          <motion.div {...fade(0)}>
            <h3>{stats.total}</h3>
            <p>Total Publications</p>
          </motion.div>
            <motion.div {...fade(0.05)}>
            <h3>{stats.platforms}</h3>
            <p>Platforms</p>
          </motion.div>
          <motion.div {...fade(0.1)}>
            <h3>{stats.latestYear}</h3>
            <p>Latest Year</p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS + SEARCH */}
      <section id="publications" className="journals-filters">
        <div className="filters-row">
          <div className="filter-buttons">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={filter === f.key ? "btn-filter active" : "btn-filter"}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search title / venue / tag…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search publications"
            />
          </div>
        </div>
        {query && (
          <div className="query-note">
            Showing {filtered.length} result{filtered.length !== 1 && "s"} for “{query}”
          </div>
        )}
      </section>

      {/* GRID */}
      <section className="journals-grid-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            No publications match your criteria.
          </div>
        ) : (
          <div className="journals-grid">
            {filtered.map((p, idx) => (
              <motion.article
                key={p.id}
                className="pub-card"
                {...fade(idx * 0.04)}
              >
                <div className="pub-meta">
                  <span className={`pill pill-${p.platform}`}>
                    {p.platform}
                  </span>
                  <span className="pub-year">{p.year}</span>
                  <span className="pub-status">{p.status}</span>
                </div>
                <h3 className="pub-title">{p.title}</h3>
                <p className="pub-venue">{p.venue}</p>
                <p className="pub-summary">{p.summary}</p>
                <div className="pub-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pub-actions">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link"
                    aria-label={`Open publication: ${p.title}`}
                  >
                    View →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* OPTIONAL SECTION: Add a call for collaborations */}
      {/* <section className="journals-collab">
        <motion.div {...fade(0)}>
          <h2>Collaborate or Cite</h2>
          <p>
            For datasets, extended appendices, or collaboration inquiries,
            reach out through our contact page. We welcome academic, clinical,
            and engineering partnerships that advance minimally invasive care.
          </p>
          <a href="/contact" className="btn-outline">
            Contact Us
          </a>
        </motion.div>
      </section> */}
    </Layouts>
  );
};

export default Journal;
