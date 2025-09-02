import "./css/userfulldetails.css";
import CardUserProfile from "../components/CardUserProfile";
import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";

const NewsFullDetails = ({ footerCard, selectedCardState, setCardList }) => {
  const detials = { ...selectedCardState[0] };
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
    <div style={{ display: "flex",flexDirection:"column",gap:"50px"}} id="detailwindow">
      <div className="user-full-fhalf">
        <div>
          <h2>{detials.title}</h2>
        </div>
        <div>
          <img
            src={detials.img}
            alt="User Profile"
            style={{ borderRadius: "var(--border-radius-primary)"}}
          />
        </div>
      </div>
      <div className="user-content">
        <p style={{fontSize:"var(--font-size-paragraph-primary)"}}>{detials.content}</p>
      </div>
      <div className="team-footer" style={{}}>
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
          {footerCard.map((card, idx) => (
            <SwiperSlide key={Math.random() * idx}>
              <NewsCard
                key={idx}
                isActive={card.isActive}
                img={card.img}
                names={card.names}
                title={card.title}
                content={card.content}
                date={card.date}
                profile={card.profile}
                onSelected={() => {
                  const element = document.getElementById("detailwindow");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                  setCardList((prevList) => {
                    return [
                      {
                        ...prevList[0],
                        ...card,
                        isActive: "true",
                      },
                    ];
                  });
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination"></div>
      </div>
    </div>
  );
};

export default NewsFullDetails;
