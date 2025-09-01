import { useState } from "react";

import "./css/caruseltwo.css";
import LeftArrow from "../assets/home/left-arrow.svg";
import RightArrow from "../assets/home/right-arrow.svg";
const CaruselTwo = ({ data }) => {
  const [slide, setSlide] = useState(0);

  function nextSlide() {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  }

  function prevSlide() {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  }

  function clickIndicator(idx) {
    setSlide(idx);
  }

  return (
    <div className="mycarousel">
      <img
        src={LeftArrow}
        alt="left arrow"
        className="arrow arrow-left"
        onClick={prevSlide}
      />
      {data.map((item, idx) => (
        <div key={idx} className={slide === idx ? "slide" : "slide-hidden"}>
          <div className="testimonoial-home-container">
            <div className="testmonial-card">
              <div className="content">
                <p className="review">
                 {item.card.content}
                </p>
                <div className="details">
                  <h5>{item.card.username}</h5>
                  <p className="desigination">{item.card.position}</p>
                </div>
              </div>
              <img src="./home/testmonial-profile.jpg" alt="" />
            </div>
          </div>
        </div>
      ))}

      <img
        src={RightArrow}
        alt="right arrow"
        className="arrow arrow-right"
        onClick={nextSlide}
      />
      <span className="indicators ">
        {data.map((_, idx) => (
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

export default CaruselTwo;
