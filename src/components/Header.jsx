import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/header.css";
import logo from "../assets/logo_icon.png";

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false); 

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

  return (
    <div className="master-navbar">
      {isSmallWindow ? (
        <nav
          className={`navbar ${isScrolled ? "navbar-small" : ""} ${
            isMenuOpen ? "navbar-bg-primary" : ""
          }`}
        >
          {/* ... (Mobile Nav) ... */}
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
            {!isSearchVisible ? (
              <span 
                className="material-symbols-outlined search-icon" // ⬅️ NEW icon class
                onClick={() => setIsSearchVisible(true)}
              >
                search
              </span>
            ) : (
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setIsSearchVisible(false)}
                autoFocus
              />
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Nav;