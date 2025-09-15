import React, { useState } from "react";
import PropTypes from "prop-types";
import VideoTabButton from "../components/VideoTabButton";
import { Link } from "react-router-dom";
import "../pages/css/homepage.css";

const YOUTUBE_VIDEOS = {
  productvideo: {
    src: "https://www.youtube.com/embed/aznxojO15M0?si=zQDqYiZfndtdVXFr",
    title: "Product 1",
  },
  trainingvideo: {
    src: "https://www.youtube.com/embed/Ttl8Gg-P-Ao?si=rpQhCp_Gc2PoRDjH",
    title: "Product 2",
  },
  surgeryvideo: {
    src: "https://www.youtube.com/embed/Nx6YOx1Kc_Y?si=DnLgLmTrvUL173id",
    title: "Product 3",
  },
  newvideo: {
    // keep a valid src as fallback but this tab will be rendered as a link
    src: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    title: "More Videos",
    isLink: true,
    link: "/videos",
  },
};

const YoutubeVideoPlayer = ({ initialVideo = "productvideo" }) => {
  const [videoKey, setVideoKey] = useState(initialVideo);

  const handleVideoSelect = (key) => {
    if (YOUTUBE_VIDEOS[key] && !YOUTUBE_VIDEOS[key].isLink) {
      setVideoKey(key);
    }
  };

  const resolvedVideo =
    (videoKey && YOUTUBE_VIDEOS[videoKey]) ||
    YOUTUBE_VIDEOS[initialVideo] ||
    Object.values(YOUTUBE_VIDEOS)[0];

  if (!resolvedVideo) return null;

  // Build embed URL including loop and playlist (required by YouTube to loop)
  function buildSrcWithAutoplayAndLoop(src) {
    try {
      const u = new URL(src);
      // Try to extract video id from /embed/ID
      const embedMatch = u.pathname.match(/\/embed\/([^\/\?]+)/);
      let vid = embedMatch ? embedMatch[1] : null;
      // If not in pathname, check query v= param
      if (!vid) vid = u.searchParams.get("v") || null;
      // If still not found, handle youtu.be short links
      if (!vid && u.hostname.includes("youtu.be")) {
        const p = u.pathname.replace("/", "");
        if (p) vid = p;
      }

      // Ensure autoplay + loop + playlist are set — playlist must equal the video id
      if (vid) {
        u.searchParams.set("autoplay", "1");
        u.searchParams.set("loop", "1");
        u.searchParams.set("playlist", vid);
        // Mute so autoplay is less likely to be blocked — remove if you want sound on autoplay
        u.searchParams.set("mute", "1");
        return u.toString();
      } else {
        // Fallback: append parameters directly
        return src.includes("?")
          ? `${src}&autoplay=1&loop=1&mute=1`
          : `${src}?autoplay=1&loop=1&mute=1`;
      }
    } catch (e) {
      // If URL parsing fails, fall back
      return src.includes("?")
        ? `${src}&autoplay=1&loop=1&mute=1`
        : `${src}?autoplay=1&loop=1&mute=1`;
    }
  }

  return (
    <div className="video-player youtube-player">
      <div className="video-wrapper">
        <div className="video-aspect">
          <iframe
            className="youtube-iframe"
            src={buildSrcWithAutoplayAndLoop(resolvedVideo.src)}
            title={resolvedVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="video-tabs-container">
        <ul className="videotabbuttons">
          {Object.keys(YOUTUBE_VIDEOS).map((key) => {
            const meta = YOUTUBE_VIDEOS[key];
            if (meta.isLink) {
              return (
                <li
                  key={key}
                  className={`video-tabbutton ${videoKey === key ? "active" : ""}`}
                >
                  <Link to={meta.link} className="video-tab-link" aria-label={meta.title}>
                    {meta.title}
                  </Link>
                </li>
              );
            }

            return (
              <VideoTabButton
                key={key}
                state={videoKey}
                dataKey={key}
                title={meta.title}
                onSelect={() => handleVideoSelect(key)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

YoutubeVideoPlayer.propTypes = {
  initialVideo: PropTypes.string,
};

export default YoutubeVideoPlayer;