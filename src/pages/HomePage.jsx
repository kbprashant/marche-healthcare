import { useState, useEffect, useRef } from "react";
import "./css/homepage.css";

import { SplitStringUsingRegex } from "../utils/SplitStringUsingRegex";
import { motion } from "framer-motion";

import { Layouts } from "../Layouts/Layouts";
import SectionHeader from "../components/SectionHeader";

import Author from "../assets/home/author.png";
import Carousel from "../components/Carousel";
import CaruselTwo from "../components/CaruselTwo";
import NewsCard from "../components/NewsCard";
import SwiperSingle from "../components/SwiperSingle";
import YoutubeVideoPlayer from "../components/YoutubeVideoPlayer";
import ModelViewer3D from "../components/ModelViewer3D";

import { Link } from "react-router-dom";
import SEOJsonLd from "../components/SEOJsonLd";

/* API base (matches other pages) */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

/* animation */
const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

// card datas
const blogCardDetails = [
  {
    img: "./card1.png",
    title: "Blog title heading will go here",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Full name1",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
  {
    img: "card2.png",
    title: "Blog title heading will go here",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Full name2",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
];

export default function HomePage() {
  const scrollToProduct = () => {
    scroll.scrollTo("/news", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  // Add state for tracking if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Add ref for the swiper container
  const swiperRef = useRef(null);

  const [slideState, setSlideState] = useState({
    noOfSlide: 3,
    navigation: true,
  });

  // New: broadcast state (latest published social broadcast)
  const [broadcast, setBroadcast] = useState(null);
  const [bcLoading, setBcLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlideState((prevState) => ({
          ...prevState,
          noOfSlide: 1,
          navigation: false,
        }));
        setIsMobile(true);
      } else if (window.innerWidth > 768 && window.innerWidth <= 1100) {
        setSlideState((prevState) => ({
          ...prevState,
          noOfSlide: 2,
          navigation: false,
        }));
        setIsMobile(false);
      } else {
        setSlideState((prevState) => ({
          ...prevState,
          noOfSlide: 3,
          navigation: true,
        }));
        setIsMobile(false);
      }
    };

    // Add mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial calls
    handleResize();
    checkMobile();

    // Event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", checkMobile);

    // Combined cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Fetch latest broadcast (category=social, limit=1)
  useEffect(() => {
    let mounted = true;
    async function loadLatestBroadcast() {
      try {
        const res = await fetch(`${API_BASE}/public/broadcasts?category=social&limit=1`, { cache: "no-store" });
        const data = await res.json();
        if (!mounted) return;
        if (data?.ok && Array.isArray(data.items) && data.items.length > 0) {
          setBroadcast(data.items[0]);
        } else {
          setBroadcast(null);
        }
      } catch (err) {
        console.error("Failed to load broadcast:", err);
        setBroadcast(null);
      } finally {
        if (mounted) setBcLoading(false);
      }
    }
    loadLatestBroadcast();
    return () => { mounted = false; };
  }, []);

  // helper to resolve image URL (absolute when needed)
  function resolveImageUrl(url) {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    // Use the API_BASE URL to correctly resolve the image path
    const apiOrigin = new URL(API_BASE, window.location.origin).origin;
    return `${apiOrigin}${url}`;
  }

  useEffect(() => {
    if (!window.customElements || !window.customElements.get('model-viewer')) {
      const s = document.createElement('script');
      s.type = 'module';
      s.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  // Card component for team values section
  const Card = ({ delay = 0, children }) => {
    if (isMobile) {
      return <div className="team-card">{children}</div>;
    }
    return (
      <motion.div
        initial={{ x: -100, y: 100 }}
        whileInView={{ x: 0, y: 0 }}
        transition={{ delay, duration: 0.8 }}
        className="team-card"
      >
        {children}
      </motion.div>
    );
  };

  return (
    <Layouts title={"Marche Healthcare - Health Equality"} description="Marche Healthcare — Innovating to make advanced healthcare accessible for all." canonical="https://marchehealthcare.org/">
      <SEOJsonLd site webpage={{ name: 'Home', description: 'Marche Healthcare — Innovating to make advanced healthcare accessible for all.' }} breadcrumb />
      <div className="home-top">
        <Carousel />
      </div>

      {/* Keep only YouTube player in the value-proposition section */}
      <div className="value-proposition">
        <YoutubeVideoPlayer />
      </div>

      {/* 3D Model Section */}
      {/* <div className="model-3d-section>
        <ModelViewer3D />
      </div> */}

      <div className="marche-values-div">
        <h2 className="team-heading">Marche’s Values</h2>
        <div className="home-our-team">
          <video autoPlay muted loop className="background-video">
            <source src={`./home/background-video.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="overlay">
            <div className="team-header">
              <p className="team-paragraph">
                At the heart of our mission, our values guide us in every step.
                Discover the principles that drive our commitment to improving
                lives globally
              </p>
            </div>

            <div className="team-cards-container">
              <div className="team-cards">
                <Card delay={0.3}>
                  <div className="team-icon-container">
                    <img
                      src={`./money.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Innovation</h3>
                    <p className="card-paragraph">
                      Pushing Boundaries, Bridging Health Disparities
                    </p>
                  </div>
                </Card>

                <Card delay={0.5}>
                  <div className="team-icon-container">
                    <img
                      src={`./Collab.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Collaboration</h3>
                    <p className="card-paragraph">
                      Unite diverse expertise to create impactful innovations
                    </p>
                  </div>
                </Card>

                <Card delay={0.7}>
                  <div className="team-icon-container">
                    <img
                      src={`./Access.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Accessibility</h3>
                    <p className="card-paragraph">
                      Bringing Modern Healthcare to Everyone
                    </p>
                  </div>
                </Card>

                <Card delay={0.9}>
                  <div className="team-icon-container">
                    <img
                      src={`./Compassion.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Compassion</h3>
                    <p className="card-paragraph">
                      Empathy at Our Core Enhancing Lives Worldwide
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* testmonial */}
      <div className="testmonialslide">
        <SwiperSingle />
      </div>

      <div className="our-partners">
        <SectionHeader
          title={`Our Partners`}
          content={`Your support fuels our mission to innovate and ensure health equity worldwide. Together, we are making advanced healthcare accessible for all.`}
        />
        <div className="partners-logos-container">
          <div className="partners-logos-scroll">
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={`./home/partner1.png`} alt="birac Logo" />
            </motion.div>
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={`./home/partner2.png`} alt="aic-pecf Logo" />
            </motion.div>
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={`./home/partner3.png`} alt="incubation Logo" />
            </motion.div>
            <motion.div
              className="logo-container"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={`./home/partner4.png`} alt="startupTn Logo" />
            </motion.div>
            {/* Duplicate logos for infinite scroll effect (kept as-is) */}
            <motion.div className="logo-container" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <img src={`./home/partner1.png`} alt="birac Logo" />
            </motion.div>
            <motion.div className="logo-container" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <img src={`./home/partner2.png`} alt="aic-pecf Logo" />
            </motion.div>
            <motion.div className="logo-container" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <img src={`./home/partner3.png`} alt="incubation Logo" />
            </motion.div>
            <motion.div className="logo-container" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <img src={`./home/partner4.png`} alt="startupTn Logo" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="blogs-and-events">
        <div className="blogs-and-events-container">
          <div className="blog-event">
            <div className="blog-event-column">
              <SectionHeader
                title={"Broadcast"}
                content={` Stay updated with our latest innovations and initiatives on our blog. Join us at upcoming events to collaborate and drive health equality forward`}
              />
            </div>

            <div className="blogs-cards-container">
              {bcLoading ? (
                // optional loading state
                <div className="blog-card-1">
                  <div className="blog-content">
                    <div className="blog-content-inside">
                      <h3 className="blog-title">Loading latest broadcast...</h3>
                    </div>
                  </div>
                </div>
              ) : broadcast ? (
                (() => {
                  const imageSrc = resolveImageUrl(broadcast.image_url) || "./home/surgery.jpg";
                  const title = broadcast.title || "Untitled Broadcast";
                  const summary = broadcast.summary || (broadcast.body_html ? String(broadcast.body_html).replace(/<[^>]+>/g, '') : "");
                  const dateStr = broadcast.created_at ? new Date(broadcast.created_at).toLocaleDateString() : "";
                  const externalLink = broadcast.link_url && /^https?:\/\//i.test(broadcast.link_url) ? broadcast.link_url : null;
                  const cardHref = externalLink || "/news";

                  return (
                    <a href={cardHref} target={externalLink ? "_blank" : undefined} rel={externalLink ? "noopener noreferrer" : undefined}>
                      <div className="blog-card-1">
                        <img src={imageSrc} alt="Broadcast" className="blog-image-1" />
                        <div className="blog-content">
                          <div className="blog-content-inside">
                            <h3 className="blog-title">{title}</h3>
                            <div className="blog-footer">
                              <div className="author-container">
                                <div className="img-container">
                                  <img src="./companyLogo.png" alt="author" className="author" />
                                </div>
                                <div className="author-content">
                                  <p className="author-name">Marche Healthcare</p>
                                  <div className="author-time">
                                    <p className="blog-date">{dateStr}</p>
                                  </div>
                                </div>
                              </div>
                              <motion.svg
                                whileHover={{ scale: 1.2 }}
                                width="42"
                                height="35"
                                viewBox="0 0 24 24"
                                fill="black"
                                className="card-social"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.25h-3v-5.5c0-1.38-.56-2-1.75-2-1.14 0-1.75.79-1.75 2v5.5h-3v-11h3v1.62c.41-.79 1.27-1.62 2.75-1.62 1.94 0 3.5 1.12 3.5 4.01v6.99z" />
                              </motion.svg>
                            </div>
                            <p className="blog-text">
                              {summary}
                              <span className="read-more">Read more...</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })()
              ) : (
                // no broadcast found -> show default card (keeps previous design)
                <a href="https://www.linkedin.com/company/marche-healthcare/" target="_blank" rel="noopener noreferrer">
                  <div className="blog-card-1">
                    <img src="./home/surgery.jpg" alt="Blog" className="blog-image-1" />
                    <div className="blog-content">
                      <div className="blog-content-inside">
                        <h3 className="blog-title">Blog title heading will go here</h3>
                        <div className="blog-footer">
                          <div className="author-container">
                            <div className="img-container">
                              <img src="./companyLogo.png" alt="author" className="author" />
                            </div>
                            <div className="author-content">
                              <p className="author-name">Marche Healthcare</p>
                              <div className="author-time">
                                <p className="blog-date">12-12-2022</p>
                              </div>
                            </div>
                          </div>
                          <motion.svg
                            whileHover={{ scale: 1.2 }}
                            width="42"
                            height="35"
                            viewBox="0 0 24 24"
                            fill="black"
                            className="card-social"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.25h-3v-5.5c0-1.38-.56-2-1.75-2-1.14 0-1.75.79-1.75 2v5.5h-3v-11h3v1.62c.41-.79 1.27-1.62 2.75-1.62 1.94 0 3.5 1.12 3.5 4.01v6.99z" />
                          </motion.svg>
                        </div>
                        <p className="blog-text">
                          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A labore eos
                          hic, doloremque quasi sed! Et enim debitis alias non perferendis labore
                          voluptas tenetur, veniam placeat iusto culpa officia ea.
                          <span className="read-more">Read more...</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </div>

          <Link
            to="/news"
            onClick={scrollToProduct}
            className="learn-more-button"
          >
            More Update
          </Link>
        </div>
      </div>


    </Layouts>
  );
}
