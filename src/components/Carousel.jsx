import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/carousel.css";
import img1 from "../images/new-img1.jpg";
import img2 from "../images/new-img2.jpg";
import img3 from "../images/new-img3.jpg";
// Add mobile-specific images
import img1Mobile from "../images/mob-img1.jpg";
import img2Mobile from "../images/mob-img2.jpg";
import img3Mobile from "../images/mob-img3.jpg";

const Carousel = () => {
  // Check if device is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { 
      img: isMobile ? img3Mobile : img3, 
      author: "LUNDEV", 
      title: "DESIGN SLIDER", 
      topic: "Marche Robo", 
      description:  "State-of-the-art technology designed for the demands of modern healthcare. Our innovative solutions are crafted to meet the highest standards, ensuring superior performance and improved patient outcomes in today's fast-paced medical environment " 
    },
    { 
      img: isMobile ? img1Mobile : img1, 
      author: "LUNDEV", 
      title: "DESIGN SLIDER", 
      topic: "ANIMAL", 
      description: "Lorem ipsum dolor sit amet..." 
    },
    { 
      img: isMobile ? img2Mobile : img2, 
      author: "LUNDEV", 
      title: "DESIGN SLIDER", 
      topic: "ANIMAL", 
      description: "Lorem ipsum dolor sit amet..." 
    }
  ];
  
  const thumbnails = [
    { img: isMobile ? img3Mobile : img3, title: "Name Slider", description: "Description" },
    { img: isMobile ? img1Mobile : img1, title: "Name Slider", description: "Description" },
    { img: isMobile ? img2Mobile : img2, title: "Name Slider", description: "Description" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeoutRef = useRef(null);
  const autoNextRef = useRef(null);

  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const showSlider = (type, specificIndex = null) => {
    if (!sliderRef.current || !thumbnailRef.current) return;

    const sliderItems = sliderRef.current.querySelectorAll(".item");
    const thumbnailItems = thumbnailRef.current.querySelectorAll(".item");
    
    if (specificIndex !== null) {
      // Direct navigation to specific slide
      const diff = specificIndex - currentIndex;
      if (diff === 0) return;
      
      type = diff > 0 ? "next" : "prev";
      const steps = Math.abs(diff);
      
      for (let i = 0; i < steps; i++) {
        if (type === "next") {
          sliderRef.current.appendChild(sliderItems[0]);
          thumbnailRef.current.appendChild(thumbnailItems[0]);
        } else {
          sliderRef.current.prepend(sliderItems[sliderItems.length - 1 - i]);
          thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1 - i]);
        }
      }
      
      setCurrentIndex(specificIndex);
    } else {
      // Normal next/prev navigation
      if (type === "next") {
        sliderRef.current.appendChild(sliderItems[0]);
        thumbnailRef.current.appendChild(thumbnailItems[0]);
        setCurrentIndex((prev) => (prev + 1) % items.length);
      } else {
        sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
        thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    }

    carouselRef.current.classList.add(type);

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

  const handleThumbnailClick = (index) => {
    showSlider(null, index);
  };

  useEffect(() => {
    autoNextRef.current = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(autoNextRef.current);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      {/* Main Carousel */}
      <div className="list" ref={sliderRef}>
        {items.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.img} alt="carousel" />
            <div className="content">
              {/* <div className="author">{item.author}</div> */}
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="des">{item.description}</div>
              <Link to="/products">  
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
            className="item"
            key={index}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={item.img} alt="thumbnail" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="arrows">
        <button id="prev" onClick={() => showSlider("prev")}>&#10094;</button>
        <button id="next" onClick={() => showSlider("next")}>&#10095;</button>
      </div>

      {/* Time Bar */}
      <div className="time"></div>
    </div>
  );
};

export default Carousel;