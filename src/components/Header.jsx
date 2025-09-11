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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsMenuOpen(false);
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
      subItems: [{ name: "Marche Robo", path: "/products#marche-robo" }],
    },
    { title: "Videos", path: "/videos", subItems: [] },
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
          {/* Logo positioning for small screens */}
          <div className={`logo-container1`}>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
          {!isMenuOpen ? (
            <img
              src="menu-svg.svg"
              style={{ height: "100%", scale: "0.6" }}
              onClick={() => {
                setIsMenuOpen((r) => !r);
                setIsScrolled(false);
              }}
            />
          ) : (
            <ul className="nav-list-smallsize">
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
            className={`logo-container1 ${
              isScrolled && !isHovered ? "logo-scrolled" : "" // 🔥 NEW CLASS
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
        </nav>
      )}
    </div>
  );
};
export default Nav;