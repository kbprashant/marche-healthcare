import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/carousel.css";
import img1 from "../images/img1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/4.jpg";

const Carousel = () => {
  const items = [
    { img: img2, author: "LUNDEV", title: "DESIGN SLIDER", topic: "Marche Robo", description:  "State-of-the-art technology designed for the demands of modern healthcare. Our innovative solutions are crafted to meet the highest standards, ensuring superior performance and improved patient outcomes in today's fast-paced medical environment " },
    { img: img4, author: "LUNDEV", title: "DESIGN SLIDER", topic: "ANIMAL", description: "Lorem ipsum dolor sit amet..." }
  ];
  const thumbnails = [
    { img: img4, title: "Name Slider", description: "Description" },
    { img: img2, title: "Name Slider", description: "Description" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeoutRef = useRef(null);
  const autoNextRef = useRef(null);
  const [forceRender, setForceRender] = useState(false); // Force component update

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const showSlider = (type) => {
    if (!sliderRef.current || !thumbnailRef.current) return;

    const sliderItems = sliderRef.current.querySelectorAll(".item");
    const thumbnailItems = thumbnailRef.current.querySelectorAll(".item");
    
    if (type === "next") {
      sliderRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      setCurrentIndex((prev) => (prev + 1) % items.length);
      carouselRef.current.classList.add("next");
    } else {
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      carouselRef.current.classList.add("prev");
    }

    setForceRender((prev) => !prev); // Force React to update UI

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      carouselRef.current.classList.remove("next");
      carouselRef.current.classList.remove("prev");
    }, timeRunning);

    clearTimeout(autoNextRef.current);
    autoNextRef.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);
  };

  useEffect(() => {

    
    autoNextRef.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => {
      clearTimeout(autoNextRef.current);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      {/* Main Carousel */}
      <div className="list" ref={sliderRef}>
        {items.map((item, index) => (
          <div className={`item ${index === currentIndex ? "active" : ""}`} key={index}>
            <img src={item.img} alt="carousel" />
            <div className="content">
              <div className="author">{item.author}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="des">{item.description}</div>
                 <Link to= "/products">  
              <div className="buttons">
             
                <button>SEE MORE</button>
                
              </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="thumbnail" ref={thumbnailRef}>
  {thumbnails.map((item, index) => (
    <div
      className={`item ${index === 0 ? "active" : ""}`}
      key={index}
      onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
    >
      <img src={item.img} alt="thumbnail" />
      <div className="content">
        <div className="title">{item.title}</div>
        <div className="description">{item.description}</div>
      </div>
    </div>
  ))}
</div>

      {/* Navigation Arrows */}
      <div className="arrows">
        <button id="prev" onClick={() => showSlider("prev")}>&#10094;</button>
        <button id="next" onClick={() => showSlider("next")}>&#10095;</button>
      </div>

      {/* Time Bar (Optional) */}
      <div className="time"></div>
    </div>
  );
};

export default Carousel;
