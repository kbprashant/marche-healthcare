// src/pages/VideoPage.jsx
import { useEffect, useMemo, useState } from "react";
import "./css/videopage.css";
import { Layouts } from "../Layouts/Layouts";
import VideoPlayer from "../components/VideoPlayer";
import { useLocation } from "react-router-dom";
import SwiperCarousel from "../components/SwiperCarousel";
import { motion } from "framer-motion";
import { getYouTubeId, ytThumb } from "../utils/youtube";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const TOPS = [
  { key: "product", label: "Product" },
  { key: "surgery", label: "Surgery" },
  { key: "training", label: "Training" },
];

// helper: build embed or empty string
function toYouTubeEmbed(url) {
  if (!url) return "";
  const m = String(url).match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return m ? `https://www.youtube.com/embed/${m[1]}` : "";
}

export default function VideoPage() {
  const [topCat, setTopCat] = useState("product");
  const [subcats, setSubcats] = useState([]);        // [{id,name}]
  const [subcatId, setSubcatId] = useState("all");   // "all" | number
  const [videos, setVideos] = useState([]);          // API rows
  const [loading, setLoading] = useState(false);

  // UI bits you already had
  const [videoTitle, setVideoTitle] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");      // iframe, when youtube
  const [fileUrl, setFileUrl] = useState("");        // non-youtube video src
  const [mobileView, setMobileView] = useState(false);

  // location hash scroll (unchanged)
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location, subcatId]);

  // responsive helper (unchanged)
  useEffect(() => {
    const onResize = () => setMobileView(window.innerWidth <= 768);
    onResize(); window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // load sub-categories whenever topCat changes
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${API_BASE}/public/video_subcategories?top_category=${encodeURIComponent(topCat)}`
        );
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        setSubcats(items);
        setSubcatId(items[0]?.id ? String(items[0].id) : "all");
      } catch {
        setSubcats([]);
        setSubcatId("all");
      }
    })();
  }, [topCat]);

  // load videos when topCat or subcatId changes
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const u = new URL(`${API_BASE}/public/videos`, window.location.origin);
        u.searchParams.set("top_category", topCat);
        if (subcatId !== "all") u.searchParams.set("sub_category", subcatId);
        const res = await fetch(u.toString());
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        setVideos(items);

        // pick “hero” video
        const first = items[0];
        if (first) {
          setVideoTitle(first.title || "");
          const yt = toYouTubeEmbed(first.youtube_url);
          setEmbedUrl(yt);
          setFileUrl(yt ? "" : (first.src_url || ""));
        } else {
          setVideoTitle("");
          setEmbedUrl("");
          setFileUrl("");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [topCat, subcatId]);

  // adapt API results to SwiperCarousel’s expected shape
  const classificationName = useMemo(() => {
    if (subcatId === "all") return "All";
    return subcats.find((s) => String(s.id) === String(subcatId))?.name || "All";
  }, [subcatId, subcats]);

  const videoCardDetials = useMemo(() => {
   const mapped = videos.map(v => {
     const id = getYouTubeId(v.youtube_url);
     const auto = id ? ytThumb(id, "max") : "";
     return {
       id: v.id,
       // order: explicit thumbnail from DB → YouTube auto → local placeholder
       link: v.thumbnail_url || auto || "./videos/card-thumbnail.png",
       name: v.title,
       play: v.youtube_url || v.src_url || "",
     };
   });
    return {
      [topCat]: {
        [classificationName]: mapped,
      },
    };
  }, [videos, topCat, classificationName]);

  const topLabel = TOPS.find(t => t.key === topCat)?.label || "";

  return (
    <Layouts title={"Video-Page"}>
      <section className="vid-banner">
        <video src="./videos/bulb-vedio .mp4" autoPlay muted loop></video>
        <div className="banner-text">
          <h3>Videos</h3>
          <p>Browse {topLabel} videos by sub-category.</p>
        </div>
      </section>

      <section className="video-gallery">
        {/* Top categories */}
        <div className="category">
          <div id="productvideo" className="category-container">
            {mobileView ? (
              <select
                className="btn-outline-rounded"
                value={topCat}
                onChange={(e) => setTopCat(e.target.value)}
              >
                {TOPS.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            ) : (
              TOPS.map((c) => (
                <button
                  key={c.key}
                  className={topCat === c.key ? "btn-outline-rounded dark" : "btn-outline-rounded"}
                  onClick={() => setTopCat(c.key)}
                >
                  {c.label}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Sub-categories (classification) */}
        <div className="sub-category">
          <h2>{topLabel} Videos</h2>
          <p>Filter by sub-category.</p>

          <div className="button-group">
            {mobileView ? (
              <select
                className="btn-outline-rounded"
                value={subcatId}
                onChange={(e) => setSubcatId(e.target.value)}
              >
                {subcats.length ? null : <option value="all">All</option>}
                {subcats.map((sc) => (
                  <option key={sc.id} value={String(sc.id)}>{sc.name}</option>
                ))}
              </select>
            ) : (
              <>
                {subcats.length === 0 ? (
                  <motion.button className="btn-outline-rounded dark" disabled>All</motion.button>
                ) : null}
                {subcats.map((sc, idx) => (
                  <motion.button
                    key={sc.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.1, delay: idx * 0.1 }}
                    className={
                      String(subcatId) === String(sc.id)
                        ? "btn-outline-rounded dark"
                        : "btn-outline-rounded"
                    }
                    onClick={() => {
                      setSubcatId(String(sc.id));
                      const el = document.getElementById("youtubevideosection");
                      if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
                    }}
                  >
                    {sc.name}
                  </motion.button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Player + carousel */}
        <div className="video-section">
          <div id="youtubevideosection">
            {loading ? (
              <div className="empty" style={{ minHeight: 300 }}>Loading…</div>
            ) : embedUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ aspectRatio: "16/9" }}
              />
            ) : fileUrl ? (
              <VideoPlayer src={fileUrl} />
            ) : (
              <div className="empty" style={{ minHeight: 300 }}>No video selected.</div>
            )}
          </div>

          <div>
            <h1 style={{ textAlign: "left", marginTop: "-50px" }}>{videoTitle}</h1>
          </div>

          <SwiperCarousel
            setVideoYtLink={(url) => {
              const yt = toYouTubeEmbed(url);
              setEmbedUrl(yt);
              setFileUrl(yt ? "" : url);
            }}
            setVideoTitle={setVideoTitle}
            videoCardDetials={videoCardDetials}
            videoLink={topCat}
            classification={classificationName}
          />
        </div>
      </section>
    </Layouts>
  );
}
