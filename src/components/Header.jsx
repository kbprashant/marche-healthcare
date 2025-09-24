import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./css/header.css";
import logo from "../assets/logo_icon.png";
import { createPortal } from "react-dom";

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsMenuOpen(false);
      setIsSearchVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallWindow(window.innerWidth <= 1080);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { title: "Home", path: "/", subItems: [] },
    {
      title: "About",
      path: "/about",
      subItems: [
        { name: "Story", path: "/about#ourstory" },
        { name: "Purpose", path: "/about#ourpurpose" },
        { name: "Mission", path: "/about#ourmission" },
        { name: "Vision", path: "/about#ourvision" },
        { name: "Team", path: "/about#ourteam" },
      ],
    },
    {
      title: "Products",
      path: "/products",
      subItems: [{ name: "NovaLap 360 D8", path: "/products#marche-robo" }],
    },
    {
      title: "Videos",
      path: "/videos",
      subItems: [
        { name: "Product", path: "/videos#product" },
        { name: "Surgery", path: "/videos#surgery" },
        { name: "Training", path: "/videos#training" },
      ],
    },
    {
      title: "Broadcast",
      path: "/news",
      subItems: [
        { name: "Social Media", path: "/news#socialmedia" },
        { name: "News & Events", path: "/news#newsandevents" },
      ],
    },
    { title: "Careers", path: "/careers", subItems: [] },
    { title: "Contact", path: "/contact", subItems: [] },
  ];

  // small hand-made suggestions list (menu items + extras)
  const extraSuggestions = [
    { label: "Home", path: "/" },
    { label: "About — Story", path: "/about#ourstory" },
    { label: "About — Purpose", path: "/about#ourpurpose" },
    { label: "About — Mission", path: "/about#ourmission" },
    { label: "About — Vision", path: "/about#ourvision" },
    { label: "Products", path: "/products" },
    { label: "Videos", path: "/videos" },
    { label: "Broadcast (Social)", path: "/news#socialmedia" },
    { label: "Broadcast (News & Events)", path: "/news#newsandevents" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ];

  const suggestionsSource = [
    ...menuItems.map((m) => ({ label: m.title, path: m.path })),
    ...extraSuggestions,
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // focus the input when overlay opens
  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 10);
    }
  }, [isSearchVisible]);

  // lock body when search is open and ensure body class for styling
  useEffect(() => {
    if (isSearchVisible) {
      document.body.classList.add("search-open");
    } else {
      document.body.classList.remove("search-open");
    }
    return () => document.body.classList.remove("search-open");
  }, [isSearchVisible]);

  function closeSearch() {
    setIsSearchVisible(false);
    setSearchQuery("");
    setFilteredSuggestions([]);
  }

  function goToResults(q) {
    closeSearch();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  // live-filter suggestions
  function updateQuery(q) {
    setSearchQuery(q);
    const v = (q || "").trim().toLowerCase();
    if (!v) {
      setFilteredSuggestions([]);
      return;
    }
    const matches = suggestionsSource
      .filter((s) => s.label.toLowerCase().includes(v))
      .slice(0, 8);
    setFilteredSuggestions(matches);
  }

  // keyboard handling: Enter -> results, Escape -> close
  function onKeyDown(e) {
    if (e.key === "Enter") {
      if (searchQuery.trim()) goToResults(searchQuery.trim());
    } else if (e.key === "Escape") {
      closeSearch();
    }
  }

  function onSuggestionClick(s) {
    if (s.path) {
      closeSearch();
      // navigate to path (if path includes hash, router handles it)
      navigate(s.path);
    } else {
      goToResults(s.label);
    }
  }

  return (
    <div className="master-navbar">
      {isSmallWindow ? (
        <nav className="mobile-navbar">
          {/* Hamburger (left) */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className={`hamburger ${isMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMenuOpen((p) => !p)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* Centered logo */}
          <Link
            to="/"
            className="mobile-logo"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Home"
          >
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          {/* Search (right) */}
          <button
            type="button"
            className="mobile-search-btn"
            aria-label="Open search"
            onClick={() => setIsSearchVisible(true)}
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Slide-down menu */}
          {isMenuOpen && (
            <div className="mobile-menu">
              <ul className="mobile-menu-list">
                {menuItems.map((item, i) => (
                  <li key={i} className="mobile-menu-item">
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.title}
                    </NavLink>
                    {item.subItems.length > 0 && (
                      <ul className="mobile-submenu">
                        {item.subItems.map((sub, si) => (
                          <li key={si}>
                            <NavLink
                              to={sub.path}
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setIsMenuOpen(false);
                              }}
                            >
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Search overlay (portal) */}
          {isSearchVisible &&
            createPortal(
              <>
                <div
                  className="search-overlay"
                  onClick={() => setIsSearchVisible(false)}
                />
                <div className="search-panel" role="dialog" aria-modal="true">
                  <div className="search-panel-header">
                    <input
                      ref={inputRef}
                      className="search-input-modal"
                      placeholder="Search the site…"
                      value={searchQuery}
                      onChange={(e) => updateQuery(e.target.value)}
                      onKeyDown={onKeyDown}
                      aria-label="Search"
                    />
                    <button
                      className="search-panel-close"
                      onClick={() => setIsSearchVisible(false)}
                      aria-label="Close search"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="search-suggestions">
                    {filteredSuggestions.length === 0 && searchQuery.trim() ? (
                      <div className="suggestion-empty">
                        No quick matches. Press Enter to search.
                      </div>
                    ) : null}
                    {filteredSuggestions.map((s, i) => (
                      <div
                        key={i}
                        className="suggestion-item"
                        onMouseDown={(ev) => {
                          ev.preventDefault();
                          onSuggestionClick(s);
                        }}
                        role="button"
                      >
                        <div className="suggestion-left">
                          <span className="suggestion-icon">🔎</span>
                        </div>
                        <div className="suggestion-center">
                          <div className="suggestion-label">{s.label}</div>
                          <div className="suggestion-path">{s.path}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>,
              document.body
            )}
        </nav>
      ) : (
        <nav
          className={`navbar ${
            isHovered ? "navbar-expanded" : isScrolled ? "navbar-small" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveMenu(null);
          }}
        >
          <div
            className={`logo-container1 in-navbar-flow ${
              isScrolled && !isHovered ? "logo-scrolled" : ""
            }`}
          >
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="nav-item"
                onMouseEnter={() => setActiveMenu(index)}
              >
                <NavLink
                  to={item.path}
                  className="nav-link"
                  onClick={scrollToTop}
                >
                  {item.title}
                </NavLink>
                {item.subItems.length > 0 && (
                  <div
                    className={`submenu ${
                      activeMenu === index ? "show" : "hide"
                    }`}
                  >
                    {item.subItems.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="submenu-item"
                        style={{ transitionDelay: `${subIndex * 0.1}s` }}
                      >
                        <Link to={sub.path} className="submenu-link">
                          {sub.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="search-container">
            {!isSearchVisible && (
              <span
                className="material-symbols-outlined search-icon"
                onClick={() => setIsSearchVisible(true)}
                role="button"
                aria-label="Open site search"
              >
                search
              </span>
            )}
            {isSearchVisible &&
              createPortal(
                <>
                  <div className="search-overlay" onClick={closeSearch} />
                  <div className="search-panel" role="dialog" aria-modal="true">
                    <div className="search-panel-header">
                      <input
                        ref={inputRef}
                        className="search-input-modal"
                        placeholder="Search the site…"
                        value={searchQuery}
                        onChange={(e) => updateQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        aria-label="Search"
                      />
                      <button
                        className="search-panel-close"
                        onClick={closeSearch}
                        aria-label="Close search"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="search-suggestions">
                      {filteredSuggestions.length === 0 && searchQuery.trim() ? (
                        <div className="suggestion-empty">
                          No quick matches. Press Enter to search.
                        </div>
                      ) : null}
                      {filteredSuggestions.map((s, i) => (
                        <div
                          key={i}
                          className="suggestion-item"
                          onMouseDown={(ev) => {
                            ev.preventDefault();
                            onSuggestionClick(s);
                          }}
                          role="button"
                        >
                          <div className="suggestion-left">
                            <span className="suggestion-icon">🔎</span>
                          </div>
                          <div className="suggestion-center">
                            <div className="suggestion-label">{s.label}</div>
                            <div className="suggestion-path">{s.path}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>,
                document.body
              )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Nav;