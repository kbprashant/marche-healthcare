import { useState, useEffect } from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./css/carousel.css";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import NewsCard from "./MediaCard";

const blogCardDetails = [
  {
    id: 1,
    img: "./card3.png",

    title: "Blog title heading will go he",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Marche Healthcare",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
  {
    id: 2,
    img: "./card2.png",

    title: "Blog title heading will go here",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Marche Healthcare",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
  {
    id: 3,
    img: "./card1.png",

    title: "Blog title heading will go here",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Marche Healthcare",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
  {
    id: 1,
    img: "./card3.png",

    title: "Blog title heading will go hee",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Marche Healthcare",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
  {
    id: 2,
    img: "./card2.png",

    title: "Blog title heading will go here",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Marche Healthcare",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
  {
    id: 3,
    img: "./card1.png",

    title: "Blog title heading will go here",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
    profile: "./companyLogo.png",
    names: "Marche Healthcare",
    date: "11 Jan 2022 ",
    linkedin: "https://www.linkedin.com/company/marche-healthcare/",
  },
];

const SwiperCarousel = ({ news, setVideoYtLink, setVideoTitle,videoCardDetials,videoLink,classification }) => {
  const [slideState, setSlideState] = useState({
    noOfSlide: 3,
    navigation: true,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSlideState((prevState) => ({
          ...prevState,
          noOfSlide: 1,
          navigation: false,
        }));
      } else if (window.innerWidth > 600 && window.innerWidth <= 770) {
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
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        // autoplay={{ delay: 10000, disableOnInteraction: false }}
        autoplay={false}
        spaceBetween={30}
        slidesPerGroup={slideState.noOfSlide}
        slidesPerView={slideState.noOfSlide}
        // navigation={slideState.navigation}
        pagination={{
          // el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet">${
              index + 1
            }</span>`;
          },
        }}
        style={{
          margin: "50px 0",
          paddingBottom: "50px",
        }}
      >
        {news
          ? blogCardDetails.map((item, idx) => {
              return (
                <SwiperSlide key={Math.random() * idx}>
                  <NewsCard {...item} />
                </SwiperSlide>
              );
            })
          : videoCardDetials[videoLink][classification]?videoCardDetials[videoLink][classification].map((item, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="card"
                  onClick={(e) => {
                    setVideoYtLink(item.play);
                    setVideoTitle(item.name);
                    const element = document.getElementById("youtubevideosection");
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop,
                        behavior: "smooth", // This makes the scrolling smooth
                      });
                    }
                  }}
                >
                  <img
                    src={item.link}
                    alt="card"
                    style={{ position: "relative" }}
                  />
                  <img
                    className="playbutton"
                    src="play_button.svg"
                    style={{
                      height: "50px",
                      width: "50px",
                      position: "absolute",
                      left: "45%",
                      top: "30%",
                      transition: "scale .2s",
                    }}
                  />
                  <div className="card-body">
                    <h2>{item.name}</h2>
                  </div>
                </div>
              </SwiperSlide>
            )):<></>}
      </Swiper>
      <div className="custom-pagination"></div>
    </div>
  );
};
export default SwiperCarousel;
