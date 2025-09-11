import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./css/videoplayer.css";

const VideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);

  // Try autoplay muted; if blocked, user can press Play (controls are visible)
  useEffect(() => {
    videoRef.current?.play?.().catch(() => {});
  }, [src]);

  return (
    <div className="vedio-div">
      <motion.video
        ref={videoRef}
        className="video-el"     // <-- new class
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        controls               // <-- native controls (mobile friendly)
        playsInline            // <-- iOS: keeps video inline, fullscreen button works
      />
    </div>
  );
};

export default VideoPlayer;
