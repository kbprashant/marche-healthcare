import "./css/userfulldetails.css";
import CardUserProfile from "../components/CardUserProfile";
import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";

const NewsFullDetails = ({ footerCard, selectedCardState, setCardList }) => {
  const detials = { ...selectedCardState[0] };

  // Build API_BASE and helper to resolve image URLs (same logic as NewsPage.jsx)
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    `${window.location.protocol}//${window.location.host}/api`;
  const apiOrigin = (API_BASE.startsWith("http")
    ? new URL(API_BASE)
    : new URL(API_BASE, window.location.origin)
  ).origin;
  const abs = (u) => (u && /^https?:\/\//i.test(u) ? u : `${apiOrigin}${u || ""}`);

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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="detailwindow" style={{ display: "flex", flexDirection: "column", gap: "50px", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 800, padding: "0 20px", boxSizing: "border-box", textAlign: "left" }}>
        <div className="user-full-fhalf" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ textAlign: "left", margin: 0 }}>{detials.title}</h2>
          </div>
          <div>
            <img
              src={detials.img}
              alt="Article"
              style={{ borderRadius: "var(--border-radius-primary)", maxWidth: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>

        <div className="user-content" style={{ textAlign: "left", marginTop: 20, lineHeight: 1.7 }}>
          {detials.body_html ? (
            <div
              style={{ fontSize: "var(--font-size-paragraph-primary)" }}
              dangerouslySetInnerHTML={{ __html: detials.body_html }}
            />
          ) : (
            <p style={{ fontSize: "var(--font-size-paragraph-primary)", margin: 0 }}>{detials.content}</p>
          )}
        </div>

        <div className="team-footer" style={{ marginTop: 40 }}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            autoplay={false}
            spaceBetween={30}
            slidesPerGroup={slideState.noOfSlide}
            slidesPerView={slideState.noOfSlide}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} custom-bullet">${index + 1}</span>`;
              },
            }}
            style={{
              margin: "50px 0",
              paddingBottom: "50px",
            }}
          >
            {footerCard.map((card, idx) => (
              <SwiperSlide key={idx}>
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
                    if (element) element.scrollIntoView({ behavior: "smooth" });

                    // If the footer card already includes full HTML, replace immediately
                    if (card && card.body_html) {
                      setCardList([{ ...card, img: abs(card.img || ""), isActive: "true" }]);
                      return;
                    }

                    // Build API_BASE same as NewsPage.jsx
                    const API_BASE =
                      import.meta.env.VITE_API_BASE_URL ||
                      `${window.location.protocol}//${window.location.host}/api`;
                    const apiOrigin = (API_BASE.startsWith("http")
                      ? new URL(API_BASE)
                      : new URL(API_BASE, window.location.origin)
                    ).origin;
                    const absLocal = (u) => (u && /^https?:\/\//i.test(u) ? u : `${apiOrigin}${u || ""}`);

                    // Otherwise fetch the full broadcast by id and replace selected card
                    (async () => {
                      try {
                        const res = await fetch(`${API_BASE}/public/broadcasts/${card.id}`, { cache: "no-store" });

                        // If server returned HTML (e.g. index.html), log it for debugging
                        const contentType = res.headers.get("content-type") || "";
                        if (!contentType.includes("application/json")) {
                          const text = await res.text();
                          console.error("Unexpected non-JSON response for single-item fetch:", res.status, text);
                          throw new Error("NON_JSON_RESPONSE");
                        }

                        const data = await res.json();
                        if (res.ok && data?.ok && data.item) {
                          const it = data.item;
                          setCardList([{
                            id: it.id,
                            img: absLocal(it.image_url || card.img || ""),
                            title: it.title || card.title || "",
                            content: it.summary || card.content || "",
                            body_html: it.body_html || "",
                            profile: "./companyLogo.png",
                            names: "Marche Healthcare",
                            date: (it.scheduled_at || it.created_at || "").slice(0,10),
                            isActive: "true",
                          }]);
                          return;
                        }

                        console.error("Single-item fetch returned no item:", res.status, data);
                      } catch (err) {
                        console.error("single-item fetch failed:", err);
                      }

                      // Fallback: replace with clicked card (ensure img is absolute)
                      setCardList([{ ...card, body_html: card.body_html || "", img: absLocal(card.img || ""), isActive: "true" }]);
                    })();
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsFullDetails;
