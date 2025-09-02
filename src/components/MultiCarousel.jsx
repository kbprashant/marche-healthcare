import { useEffect, useState } from "react";

import "./css/multicarousel.css";
import LeftArrow from "../assets/home/left-arrow.svg";
import RightArrow from "../assets/home/right-arrow.svg";
import NewsCard from "./NewsCard";


const blogCardDetails = [
  [
    {
      id: 1,
      img: "./card1.png",
      title: "Blog title heading will go here",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
      profile: "./profile1.png",
      names: "Full name1",
      date: "11 Jan 2022 ",
    },
    {
      id: 2,
      img: "./card2.png",

      title: "Blog title heading will go here",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
      profile: "./profile2.png",
      names: "Full name2",
      date: "11 Jan 2022 ",
    },
    {
      id: 3,
      img: "./card3.png",

      title:
        "Blog title heading will go heconst carouselRef = React.useRef();re",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
      profile: "./profile3.png",
      names: "Full name3",
      date: "11 Jan 2022 ",
    },
  ],
  [
    {
      id: 1,
      img: "./card3.png",

      title:
        "Blog title heading will go heconst carouselRef = React.useRef();re",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
      profile: "./profile3.png",
      names: "Full name3",
      date: "11 Jan 2022 ",
    },
    {
      id: 2,
      img: "./card2.png",

      title: "Blog title heading will go here",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
      profile: "./profile2.png",
      names: "Full name2",
      date: "11 Jan 2022 ",
    },
    {
      id: 3,
      img: "./card1.png",

      title: "Blog title heading will go here",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros",
      profile: "./profile1.png",
      names: "Full name1",
      date: "11 Jan 2022 ",
    },
  ],
];

const videoCardDetials = [
  [
    { id: 1, link: "./videos/card-thumbnail.png", name: "Video name1" },
    { id: 2, link: "./videos/card-thumbnail.png", name: "Video name2" },
    { id: 3, link: "./videos/card-thumbnail.png", name: "Video name3" },
  ],
  [
    { id: 1, link: "./videos/card-thumbnail.png", name: "Video name2" },
    { id: 2, link: "./videos/card-thumbnail.png", name: "Video name3" },
    { id: 3, link: "./videos/card-thumbnail.png", name: "Video name1" },
  ],
];

const MultiCarousel = ({ newscard }) => {
  const [slide, setSlide] = useState(0);
  const [dataArr, setDataArr] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null); // State to store the timeout ID

  useEffect(() => {
    setDataArr(newscard ? blogCardDetails : videoCardDetials);
  }, []);

  function nextSlide() {
    setSlide((prevSlide) =>
      prevSlide === dataArr.length - 1 ? 0 : prevSlide + 1
    );
  }

  function prevSlide() {
    setSlide(slide === 0 ? dataArr.length - 1 : slide - 1);
  }

  function clickIndicator(idx) {
    setSlide(idx);
    clearTimeout(timeoutId); // Clear any existing timeout when clicking an indicator
  }

  return (
    <div className="multicarousel">
      <img
        src={LeftArrow}
        alt="left arrow"
        className="arrow arrow-left"
        onClick={() => {
          prevSlide(dataArr);
        }}
      />
      {newscard
        ? blogCardDetails.map((item, idx) => {
            return (
              <div
                key={idx}
                className={slide === idx ? "slide" : "slide-hidden"}
              >
                {item.map((card, idx) => (
                  <NewsCard key={idx} {...card} />
                ))}
              </div>
            );
          })
        : videoCardDetials.map((item, idx) => (
            <div key={idx} className={slide === idx ? "slide" : "slide-hidden"}>
              {item.map((card, i) => (
                <div key={i} className="card">
                  <img src={card.link} alt="card" />
                  <div className="card-body">
                    <h2>{card.name}</h2>
                  </div>
                </div>
              ))}
            </div>
          ))}
      <img
        src={RightArrow}
        alt="right arrow"
        className="arrow arrow-right"
        onClick={() => {
          nextSlide(dataArr);
        }}
      />
      <span className="indicators">
        {dataArr.map((_, idx) => (
          <button
            key={idx}
            className={
              slide === idx ? "indicator" : "indicator indicator-inactive"
            }
            onClick={() => {
              clickIndicator(idx);
            }}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default MultiCarousel;
