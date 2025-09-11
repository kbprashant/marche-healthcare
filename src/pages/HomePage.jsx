import { useState, useEffect } from "react";
import "./css/homepage.css";

import { SplitStringUsingRegex } from "../utils/SplitStringUsingRegex";
import { motion } from "framer-motion";

import { Layouts } from "../Layouts/Layouts";
import VideoPlayer from "../components/VideoPlayer";
import SectionHeader from "../components/SectionHeader";
import VideoTabButton from "../components/VideoTabButton";

import Author from "../assets/home/author.png";
import Carousel from "../components/Carousel";
import CaruselTwo from "../components/CaruselTwo";
import NewsCard from "../components/NewsCard";
import SwiperSingle from "../components/SwiperSingle";

import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// animation
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

const VIDEODATA = {
  productvideo: {
    src: "./home/background-video3.mp4",
  },
  trainingvideo: {
    src: "./videos/videobg.mp4",
  },
  surgeryvideo: {
    src: "./home/background-video.mp4",
  },
};
export default function HomePage() {
  const scrollToProduct = () => {
    scroll.scrollTo("/news", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const [videoLink, setVideoLink] = useState("productvideo");

  function videoTabHandle(selectedButton) {
    setVideoLink(selectedButton);
  }
  const [slideState, setSlideState] = useState({
    noOfSlide: 3,
    navigation: true,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlideState((prevState) => ({
          ...prevState,
          noOfSlide: 1,
          navigation: false,
        }));
      } else if (window.innerWidth > 768   && window.innerWidth <= 1100) {
        setSlideState((prevState) => ({
          ...prevState,
          noOfSlide: 2,
          navigation: false,
        }));
      } else {
        setSlideState((prevState) => ({
          ...prevState,
          noOfSlide: 3,
          navigation: true,
        }));
      }
    };

    // Initial call to set initial state based on window width
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layouts title={"Home-Page"}>
      <div className="home-top">
        <Carousel />
      </div>

      <div className="value-proposition">
        <div className="value-column">
          <SectionHeader
            title="Videos"
            content="Gain insights into our product's functionality and benefits via our video showcase"
          />
        </div>

        <div className="video-player">
          <div className="video-wrapper">
            <div className="video-aspect">
              <VideoPlayer src={VIDEODATA[videoLink].src} />
            </div>

            {/* Buttons BELOW the video */}
            <ul className="videotabbuttons">
              <VideoTabButton state={videoLink} title="Product Video"  onSelect={() => videoTabHandle("productvideo")} />
              <VideoTabButton state={videoLink} title="Training Video" onSelect={() => videoTabHandle("trainingvideo")} />
              <VideoTabButton state={videoLink} title="Surgery Video"  onSelect={() => videoTabHandle("surgeryvideo")} />
              <a href="/marche-healthcare/videos"><VideoTabButton title="View All" /></a>
            </ul>
          </div>
        </div>

      </div>

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
                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="team-card"
                >
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
                </motion.div>

                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="team-card"
                >
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
                </motion.div>

                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="team-card"
                >
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
                </motion.div>
                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="team-card"
                >
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
                </motion.div>
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
            {/* Duplicate logos for infinite scroll effect */}
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

            {/* Duplicate logos for infinite scroll effect */}
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

            {/* Duplicate logos for infinite scroll effect */}
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
              <a
                href="https://www.linkedin.com/company/marche-healthcare/"
                target="_blank"
              >
                <div className="blog-card-1">
                  <img
                    src="./home/surgery.jpg"
                    alt="Blog"
                    className="blog-image-1"
                  />
                  <div className="blog-content">
                    <div className="blog-content-inside">
                      <h3 className="blog-title">
                        Blog title heading will go here
                      </h3>
                      <div className="blog-footer">
                        <div className="author-container">
                          <div className="img-container">
                            <img
                              src="./companyLogo.png"
                              alt="author"
                              className="author"
                            />
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
                        {/* <a
                  href="https://www.linkedin.com/company/marche-healthcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                </a> */}
                      </div>
                      <p className="blog-text">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. A labore eos hic, doloremque quasi sed! Et enim
                        debitis alias non perferendis labore voluptas tenetur,
                        veniam placeat iusto culpa officia ea. Lorem ipsum
                        dolor, sit amet consectetur adipisicing elit. A labore
                        eos hic, doloremque quasi sed! Et enim debitis alias non
                        perferendis labore voluptas tenetur, veniam placeat
                        iusto culpa officia ea.
                        <span className="read-more">Read more...</span>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
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
