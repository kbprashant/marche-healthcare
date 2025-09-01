import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./css/header.css";
import logo from "../assets/logo.png";

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Detect scroll
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
      if (window.innerWidth <= 1080) {
        setIsSmallWindow(true);
      } else {
        setIsSmallWindow(false);
      }
    };

    // Initial call to set initial state based on window width
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
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
      title: "BroadCast",
      path: "/news",
      subItems: [
        { name: "Social Media", path: "/news#socialmedia" },
        { name: "News & Events", path: "/news#newsandevents" },
      ],
    },
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
          <div className={`logo-container1`}>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
          {!isMenuOpen ? (
            <img
              src="menu-svg.svg"
              style={{ height: "100%", scale: "0.6" }}
              onClick={(e) => {setIsMenuOpen((r) => !r)
                ;
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
                    className=" nav-link"
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
                          style={{ transitionDelay: `${subIndex * 0.1}s` }} // Dynamic delay
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
          {/* Logo added here */}
          <div
            className={`logo-container1 ${
              isScrolled && !isHovered ? "hide-logo" : ""
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
                  className=" nav-link"
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
                        style={{ transitionDelay: `${subIndex * 0.1}s` }} // Dynamic delay
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
