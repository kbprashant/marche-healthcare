import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./admin-css/admin.css";

/* Small helper for the sidenav */
function NavItem({ to, label }) {
  const { pathname } = useLocation();
  const active = pathname.startsWith(to);
  return (
    <Link to={to} className={`admin-nav-item ${active ? "active" : ""}`}>
      {label}
    </Link>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();

  // Search state/refs
  const [q, setQ] = useState("");
  const searchRef = useRef(null);

  const { logout } = useAuth();

  // Menus state/refs
  const [openQC, setOpenQC] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const qcRef = useRef(null);
  const userRef = useRef(null);

  // Submit search
  function submitSearch(e) {
    e.preventDefault();
    const query = (q || "").trim();
    if (!query) return;
    navigate(`/admin/search?q=${encodeURIComponent(query)}`);
  }

  // Close menus on outside click
  useEffect(() => {
    function onDocMouseDown(ev) {
      if (openQC && qcRef.current && !qcRef.current.contains(ev.target)) {
        setOpenQC(false);
      }
      if (openUser && userRef.current && !userRef.current.contains(ev.target)) {
        setOpenUser(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [openQC, openUser]);

  // Keyboard shortcut: Ctrl/Cmd + K focuses search
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="admin-root">
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <Link to="/" className="admin-logo">◄ Marche • Admin</Link>
        </div>

        <form className="admin-search" onSubmit={submitSearch} role="search">
          <input
            ref={searchRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="admin-search-input"
            placeholder="Search across Videos, Careers, Broadcasts… (Ctrl/⌘+K)"
            aria-label="Search admin"
          />
          <button className="admin-search-go" aria-label="Search">↵</button>
        </form>

        <div className="admin-topbar-right">
          {/* Quick Create */}
          <div className="menu" ref={qcRef}>
            <button
              type="button"
              className="menu-trigger"
              onClick={() => setOpenQC((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={openQC}
            >
              ⊕ Quick Create
            </button>
            {openQC && (
              <div className="menu-sheet" role="menu">
                <button
                  type="button"
                  className="menu-item"
                  role="menuitem"
                  onClick={() => { setOpenQC(false); navigate('/admin/videos?new=1'); }}
                >
                  New Video
                </button>
                <button
                  type="button"
                  className="menu-item"
                  role="menuitem"
                  onClick={() => { setOpenQC(false); navigate('/admin/careers?new=1'); }}
                >
                  New Career
                </button>
                <button
                  type="button"
                  className="menu-item"
                  role="menuitem"
                  onClick={() => { setOpenQC(false); navigate('/admin/broadcasts?new=1'); }}
                >
                  New Broadcast
                </button>
                <button
                  type="button"
                  className="menu-item"
                  role="menuitem"
                  onClick={() => { setOpenQC(false); navigate('/admin/testimonials?new=1'); }}
                >
                  New Testimonial
                </button>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="menu" ref={userRef}>
            <button
              type="button"
              className="menu-trigger"
              onClick={() => setOpenUser((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={openUser}
            >
              Admin ⌄
            </button>
            {openUser && (
              <div className="menu-sheet" role="menu">
                <button
                  type="button"
                  className="menu-item"
                  role="menuitem"
                  onClick={() => { setOpenUser(false); navigate('/admin/profile'); }}
                >
                  Profile
                </button>
                <button
                  type="button"
                  className="menu-item"
                  role="menuitem"
                  onClick={() => { setOpenUser(false); navigate('/admin/audit-logs'); }}
                >
                  Audit Logs
                </button>
                <button
                className="menu-item danger"
                role="menuitem"
                onClick={async () => {
                  await logout();
                  navigate("/admin/login", { replace: true });
                }}
              >
                Sign out
              </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="admin-shell">
        <aside className="admin-sidenav">
          <nav className="admin-nav">
            <NavItem to="/admin/videos" label="Videos" />
            <NavItem to="/admin/careers" label="Careers" />
            <NavItem to="/admin/broadcasts" label="Broadcasts" />
            <NavItem to="/admin/testimonials" label="Testimonials" />
          </nav>
        </aside>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
