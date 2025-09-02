import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { Layouts } from "../Layouts/Layouts";
import "./css/aboutpage.css";
// import banner from "../assets/about/aboutbanner.png";

import CardUserProfile from "../components/CardUserProfile";
import UserFullDetails from "../components/UserFullDetails";
import ScrollingContainer from "../components/ScrollingContainer";
import { SplitStringUsingRegex } from "../utils/SplitStringUsingRegex";
const ourVissionPara =
  "Our vision is a world where health equality is not just an aspiration but a fundamental human right, where every individual, regardless of background or circumstance, has access to equitable healthcare and opportunities for a healthy life.";

const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};
const BlockText = '"Innovation';
const HeroText = " is at the ";
const BlockText3 = "heart";
const HeroText2 = ` of
  everything we `;
const BlockText4 = "do.";
const HeroText3 = ` We believe that `;
const BlockText5 = "groundbreaking ideas";
const HeroText4 = `
   and state-of-the-
  art `;
const BlockText6 = "technology";
const HeroText5 = ` have the power to
  `;
const BlockText7 = "transform";
const HeroText6 = ` healthcare and
  promote `;
const BlockText2 = 'health equality."';
const heroText = SplitStringUsingRegex(HeroText);
const heroText2 = SplitStringUsingRegex(HeroText2);
const heroText3 = SplitStringUsingRegex(HeroText3);
const heroText4 = SplitStringUsingRegex(HeroText4);
const heroText5 = SplitStringUsingRegex(HeroText5);
const heroText6 = SplitStringUsingRegex(HeroText6);
const blockText = SplitStringUsingRegex(BlockText);
const blockText2 = SplitStringUsingRegex(BlockText2);
const blockText3 = SplitStringUsingRegex(BlockText3);
const blockText4 = SplitStringUsingRegex(BlockText4);
const blockText5 = SplitStringUsingRegex(BlockText5);
const blockText6 = SplitStringUsingRegex(BlockText6);
const blockText7 = SplitStringUsingRegex(BlockText7);

const USERS = {
  boardofdirectors: [
    {
      id: 1,
      isActive: false,
      profileImg: "./profilePic.png",
      name: "Dr. M. Mari Raj",
      position: "Founder & CEO",
      twitter: "https://x.com/dr_mariraj?t=VuX2qMmZH_aW1omgQP0UQQ&s=08",
      linkedin:
        "https://www.linkedin.com/in/dr-mariraj?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram:
        "https://www.instagram.com/dr.mariraj?igsh=MXRraXl6NG54aGs0ZA==",
    },
    {
      id: 2,
      isActive: false,
      // profileImg: `./about/Photo.png`,
      profileImg: `./about/Photo.png`,
      name: "John Carter",
      position: "Founder & CEO",
      twitter: "https://x.com/info_march49738",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
      instagram:
        "https://www.instagram.com/invites/contact/?igsh=jcoo1221g882&utm_content=uh81aej",
    },
  ],
  scientificadvisors: [
    {
      id: 1,
      isActive: false,
      profileImg: `./about/Photo.png`,
      name: "John Carter",
      position: "Founder & CEO",
      twitter: "https://x.com/info_march49738",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
      instagram:
        "https://www.instagram.com/invites/contact/?igsh=jcoo1221g882&utm_content=uh81aej",
    },
    {
      id: 2,
      isActive: false,
      profileImg: "./profilePic.png",
      name: "Dr. M. Mari Raj",
      position: "Founder & CEO",
      twitter: "https://x.com/dr_mariraj?t=VuX2qMmZH_aW1omgQP0UQQ&s=08",
      linkedin:
        "https://www.linkedin.com/in/dr-mariraj?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram:
        "https://www.instagram.com/dr.mariraj?igsh=MXRraXl6NG54aGs0ZA==",
    },
    {
      id: 3,
      isActive: false,
      profileImg: `./about/Photo.png`,
      name: "John Carter",
      position: "Founder & CEO",
      twitter: "https://x.com/info_march49738",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
      instagram:
        "https://www.instagram.com/invites/contact/?igsh=jcoo1221g882&utm_content=uh81aej",
    },
    {
      id: 4,
      isActive: false,
      profileImg: "./profilePic.png",
      name: "Dr. M. Mari Raj",
      position: "Founder & CEO",
      twitter: "https://x.com/info_march49738",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
      instagram:
        "https://www.instagram.com/invites/contact/?igsh=jcoo1221g882&utm_content=uh81aej",
    },
  ],
};

export default function AboutPage() {
  const [selectdTab, setSelectdTab] = useState("boardofdirectors");

  const [selctedCardList, setSelctedCardList] = useState(USERS[selectdTab]);
  
  function handleSelectUserBlog(username) {
    setSelectdTab(username);
    
    setSelctedCardList(USERS[username.toString()]);
  }
  
  // navigaiton
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMobileView(true);
      } else {
        setMobileView(false);
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
    <Layouts title={"About-Page"}>
      <section className="abt-banner">
        <div>
          <h1>Welcome</h1>
          <h1>To</h1>
          <h1>Marche Healthcare</h1>
        </div>
      </section>
      <div id="ourstory" className="aboutCompany">
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3 }}
          className="aboutCompany-content"
        >
          <p className="about-subheading">
            {/* <img src="./about/companyLogo.png" alt="about" /> */}
          </p>
          <h3 className="abtcom-heading">Our story</h3>

          <motion.p
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.01 }}
            className="abt-running-paragraph"
          >
            {blockText.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
                style={{ fontWeight: "600" }}
              >
                {char}
              </motion.span>
            ))}
            {heroText.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
            {blockText3.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
                style={{ fontWeight: "600" }}
              >
                {char}
              </motion.span>
            ))}
            {heroText2.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
            {blockText4.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
                style={{ fontWeight: "600" }}
              >
                {char}
              </motion.span>
            ))}
            {heroText3.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
            {blockText5.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
                style={{ fontWeight: "600" }}
              >
                {char}
              </motion.span>
            ))}
            {heroText4.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
            {blockText6.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
                style={{ fontWeight: "600" }}
              >
                {char}
              </motion.span>
            ))}
            {heroText5.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
            {blockText7.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
                style={{ fontWeight: "600" }}
              >
                {char}
              </motion.span>
            ))}
            {heroText6.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
            {blockText2.map((char) => (
              <motion.span
                key={Math.random() * 255}
                transition={{ duration: 1 }}
                variants={charVariants}
                style={{ fontWeight: "600" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
          <br />
          <p className="abtcom-para">
            Welcome to Marche Health Care, where innovation meets dedication.
            Founded in 2020, we are a forward-thinking startup committed to
            revolutionizing the biomedical field.
            {/* Our primary focus is on the
            innovation and development of cutting-edge biomedical instruments
            designed to empower healthcare professionals. */}
            {/* <br />
            <br />  */}
            {/* At Marche Health Care, we believe in pushing the boundaries
            of medical technology to enhance the capabilities of those on the
            frontlines of healthcare. Our team of experts is dedicated to
            creating solutions that improve patient outcomes and streamline
            medical processes. Join us on our journey to transform healthcare
            through innovation and excellence. */}
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3 }}
          className="abt-img"
        >
          <img src="./about/aboutside.png" alt="ourstory" />
        </motion.div>
      </div>

      <div id="ourpurpose" className="purpose-container">
        <img
          src={`./doctorimage.jpg`}
          alt="Purpose Background"
          className="purpose-image"
        />
        {mobileView ? (
          <div className="purpose-overlay">
            <h2 className="purpose-heading">Our Purpose</h2>
            <p className="purpose-text">
              "Marche Healthcare is dedicated to addressing health disparities
              by developing innovative medical devices that ensure equal access
              to high-quality care for all"
            </p>
            <div className="author-info">
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={"./author.png"}
                  alt="Author"
                  className="author-image"
                />
                <div className="author-details">
                  <p className="author-name">Dr. Mari Raj</p>
                  <p className="author-position">Founder & CEO</p>
                </div>
              </div>

              <div className="divider"></div>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <a
                    href="https://www.linkedin.com/company/marche-healthcare/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <motion.svg
                      whileHover={{ scale: 1.2, fill: "var(--primary)" }}
                      width="38"
                      height="30"
                      style={{ marginLeft: "-10px", marginTop: "8px" }}
                      // className="logo-inside-logo-div"
                      viewBox="0 0 24 24"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.25h-3v-5.5c0-1.38-.56-2-1.75-2-1.14 0-1.75.79-1.75 2v5.5h-3v-11h3v1.62c.41-.79 1.27-1.62 2.75-1.62 1.94 0 3.5 1.12 3.5 4.01v6.99z" />
                    </motion.svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1.2 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="purpose-overlay"
          >
            <h2 className="purpose-heading">Our Purpose</h2>
            <p className="purpose-text">
              "Marche Healthcare is dedicated to addressing health disparities
              by developing innovative medical devices that ensure equal access
              to high-quality care for all"
            </p>
            <div className="author-info">
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={"./author.png"}
                  alt="Author"
                  className="author-image"
                />
                <div className="author-details">
                  <p className="author-name">Dr. Mari Raj</p>
                  <p className="author-position">Founder & CEO</p>
                </div>
              </div>

              <div className="divider"></div>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <a
                    href="https://www.linkedin.com/company/marche-healthcare/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <motion.svg
                      whileHover={{ scale: 1.2, fill: "var(--primary)" }}
                      width="38"
                      height="30"
                      style={{ marginLeft: "-10px", marginTop: "8px" }}
                      // className="logo-inside-logo-div"
                      viewBox="0 0 24 24"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.25h-3v-5.5c0-1.38-.56-2-1.75-2-1.14 0-1.75.79-1.75 2v5.5h-3v-11h3v1.62c.41-.79 1.27-1.62 2.75-1.62 1.94 0 3.5 1.12 3.5 4.01v6.99z" />
                    </motion.svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div id="ourmission" className="aboutMission">
        <ScrollingContainer
          heading="Our Mission"
          subHeading="Marche Healthcare's mission is to unite talented minds and
                foster collaboration, leveraging cutting-edge technology to
                tackle health disparities. By harnessing innovation and
                expertise, we aim to empower healthcare professionals and to
                create equitable access to advanced healthcare solutions,
                ensuring better health outcomes for all"
          bgimg="./photography-sunlight.jpg"
          mobileView={mobileView}
          setMobileView={setMobileView}
        ></ScrollingContainer>

        <div className="abtMission-frame2">
          <motion.div className="abtframe-card">
            <div className="card-body">
              <h3>Uniting Talented Minds</h3>
              <p>
                Together, we create transformative solutions that promote health
                equality
              </p>
            </div>
          </motion.div>

          <motion.div className="abtframe-card">
            <div className="card-body">
              <h3>Empower Healthcare Professionals</h3>
              <p>
                Our innovative solutions enhance their capabilities and
                streamline workflows
              </p>
            </div>
          </motion.div>

          <motion.div className="abtframe-card">
            <div className="card-body">
              <h3>Advancing Health Equality</h3>
              <p>
                Ensure that everyone, regardless of their background, receives
                the highest standard of healthcare
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div id="ourvision" className="aboutVision">
        <div className="vision-frame">
          <motion.img
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            src={`./about/ourvisionimg.png`}
            alt="Vision"
            className="abt-img"
          />
          <motion.div
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="vision-content"
          >
            <h2 className="vision-heading">Our Vision</h2>
            <p className="vision-paragraph">
              {" "}
              Our vision is a world where health equality is not just an
              aspiration but a fundamental human right, where every individual,
              regardless of background or circumstance, has access to equitable
              healthcare and opportunities for a healthy life.
            </p>
          </motion.div>
        </div>
      </div>

      <div id="ourteam" className="about-team">
        <div className="team-header">
          <h2 className="team-heading">Our Team</h2>
          <p className="team-paragraph">
            With a shared passion for improving global health outcomes, our team
            is dedicated to making a meaningful impact in the healthcare
            industry
          </p>
        </div>

        <div className="team-container">
          <div className="team-button">
            <button
              className={selectdTab === "boardofdirectors" ? "active" : ""}
              onClick={() => {
                handleSelectUserBlog("boardofdirectors");
              }}
            >
              Board of Directors
            </button>
            <button
              className={selectdTab === "scientificadvisors" ? "active" : ""}
              onClick={() => {
                handleSelectUserBlog("scientificadvisors");
              }}
            >
              Scientific Advisors
            </button>
          </div>
          <div className="team-cards-container">
            {selctedCardList ? (
              selctedCardList.map((userdetails, idx) => {
                return (
                  <CardUserProfile
                    isActive={userdetails.isActive ? true : ""}
                    key={idx}
                    profileimg={userdetails.profileImg}
                    profilename={userdetails.name}
                    profiledesigination={userdetails.position}
                    twitter={userdetails.twitter}
                    linkedin={userdetails.linkedin}
                    instagram={userdetails.instagram}
                    onSelected={() => {
                      setSelctedCardList((prevList) => {
                        return [
                          {
                            ...prevList[0],
                            ...selctedCardList.filter(
                              (value) => value.id === userdetails.id
                            )[0],
                            isActive: "true",
                          },
                        ];
                      });
                    }}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>

          {selctedCardList[0].isActive ? (
            <UserFullDetails
              setCardList={setSelctedCardList}
              selectedCardState={selctedCardList}
              footerCard={USERS[selectdTab].filter((obj) => {
                const removeValue = selctedCardList[0].id;
                return obj["id"] !== removeValue;
              })}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layouts>
  );
}
