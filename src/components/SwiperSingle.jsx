// src/components/SwiperSingle.jsx
import { useEffect, useMemo, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./css/caruseltwo.css";
import "swiper/swiper-bundle.css";

// const API_PUBLIC = import.meta.env.VITE_API_PUBLIC_BASE_URL || "/api";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

// Build absolute URL for images returned as "/uploads/…"
function toAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  try {
    // already absolute?
    const u = new URL(pathOrUrl);
    return u.href;
  } catch {
    // relative path → prefix with API origin
    const origin = new URL(API_BASE).origin;
    return `${origin}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
  }
}

export default function SwiperSingle() {
  const [items, setItems] = useState([]);

  const load = useMemo(
    () => async () => {
      try {
        const res = await fetch(`${API_BASE}/public/testimonials?limit=10`);
        const data = await res.json();
        setItems(Array.isArray(data?.items) ? data.items : []);
      } catch {
        setItems([]); // silent fail → no carousel
      }
    },
    []
  );

  useEffect(() => { load(); }, [load]);

  if (!items.length) return null;

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      autoplay={{ delay: 100000, disableOnInteraction: false }} // keep your current timing
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {items.map((t) => (
        <SwiperSlide key={t.id}>
          <div className="testimonoial-home-container">
            <div className="testmonial-card">
              <div className="content">
                <p className="review">{t.message}</p>
                <div className="details">
                  <div>
                    <h5>{t.person_name}</h5>
                    <p className="desigination">
                      {[t.person_title, t.company].filter(Boolean).join(" • ")}
                    </p>
                  </div>

                  {/* Keep your LinkedIn button; link to company page (optional) */}
                  <a
                    href="https://www.linkedin.com/company/marche-healthcare/"
                    target="_blank"
                    rel="noreferrer"
                    className="icon"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.5 3.24268C3.67 3.24268 3 3.91425 3 4.74268V19.7427C3 20.5711 3.67 21.2427 4.5 21.2427H19.5C20.33 21.2427 21 20.5711 21 19.7427V4.74268C21 3.91425 20.33 3.24268 19.5 3.24268H4.5ZM8.52 7.2454C8.53 8.20165 7.81 8.79087 6.96 8.78665C6.16 8.78243 5.46 8.1454 5.47 7.24681C5.47 6.40165 6.14 5.72243 7.01 5.74212C7.89 5.76181 8.53 6.40728 8.52 7.2454ZM12.28 10.0044H9.76V18.5643H12.42C12.42 17.9847 12.42 17.6047 12.42 17.2246C12.42 16.2108 12.42 15.1959 12.42 14.1824C12.43 13.9363 12.44 13.6804 12.5 13.4455C12.74 12.568 13.53 12.0013 14.41 12.1406C14.97 12.2291 15.35 12.5568 15.5 13.0898C15.6 13.423 15.64 13.7816 15.65 14.129C15.66 15.1766 15.66 16.2242 15.66 17.2719C15.66 17.6417 15.66 18.0117 15.66 18.3815V18.5629H18.33V18.3576C18.33 17.9056 18.33 17.4537 18.33 17.0018C18.33 15.8723 18.33 14.7428 18.33 13.6129C18.33 13.1024 18.28 12.599 18.15 12.1054C17.96 11.3713 17.58 10.7638 16.95 10.3251C16.5 10.0129 16.01 9.81178 15.47 9.78928C15.4 9.78669 15.34 9.7833 15.28 9.77989C15 9.76477 14.71 9.74941 14.45 9.80334C13.68 9.95662 13.01 10.3068 12.5 10.9241L12.28 11.1984V10.0044ZM5.68164 18.5671H8.33242V10.01H5.68164V18.5671Z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {t.image ? (
                <img src={toAbsoluteUrl(t.image)} alt={t.person_name} />
              ) : (
                <img src="./home/testmonial-profile.jpg" alt="" />
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
