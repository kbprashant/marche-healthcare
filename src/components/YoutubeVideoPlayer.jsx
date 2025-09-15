import React, { useState } from "react";
import PropTypes from "prop-types";
import VideoTabButton from "../components/VideoTabButton";
import "../pages/css/homepage.css"; // ensure this path is correct in your project

const YOUTUBE_VIDEOS = {
  productvideo: {
    src: "https://www.youtube.com/embed/aznxojO15M0?si=zQDqYiZfndtdVXFr",
    title: "Product Video",
  },
  trainingvideo: {
    src: "https://www.youtube.com/embed/Ttl8Gg-P-Ao?si=rpQhCp_Gc2PoRDjH",
    title: "Training Video",
  },
  surgeryvideo: {
    src: "https://www.youtube.com/embed/Nx6YOx1Kc_Y?si=DnLgLmTrvUL173id",
    title: "Surgery Video",
  },
  newvideo: {
    src: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
    title: "New Video Title",
  },
};

const YoutubeVideoPlayer = ({ initialVideo = "productvideo" }) => {
  const [videoKey, setVideoKey] = useState(initialVideo);

  const handleVideoSelect = (key) => {
    if (YOUTUBE_VIDEOS[key]) {
      setVideoKey(key);
    }
  };

  // defensive resolved video (fallback to first if necessary)
  const resolvedVideo =
    (videoKey && YOUTUBE_VIDEOS[videoKey]) ||
    YOUTUBE_VIDEOS[initialVideo] ||
    Object.values(YOUTUBE_VIDEOS)[0];

  if (!resolvedVideo) return null;

  const buildSrcWithAutoplay = (src) =>
    src.includes("?") ? `${src}&autoplay=1` : `${src}?autoplay=1`;

  return (
    <div className="video-player youtube-player">
      <div className="video-wrapper">
        <div className="video-aspect">
          <iframe
            className="youtube-iframe"
            src={buildSrcWithAutoplay(resolvedVideo.src)}
            title={resolvedVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="video-tabs-container">
        <ul className="videotabbuttons">
          {Object.keys(YOUTUBE_VIDEOS).map((key) => (
            <VideoTabButton
              key={key}
              state={videoKey}
              dataKey={key}
              title={YOUTUBE_VIDEOS[key].title}
              onSelect={() => handleVideoSelect(key)}
            />
          ))}
        </ul>
      </div>

    </div>
  );
};

YoutubeVideoPlayer.propTypes = {
  initialVideo: PropTypes.string,
};

export default YoutubeVideoPlayer;