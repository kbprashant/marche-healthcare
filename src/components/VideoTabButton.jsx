import React from "react";
import "./css/videotabbutton.css";

const VideoTabButton = ({ title, state = "", onSelect = () => {} }) => {
  return (
    <li style={{ listStyle: "none" }}>
      <button
        className={
          title.toLowerCase().replace(/\s+/g, "") === state
            ? "video-tabbutton video-tabbutton-active"
            : "video-tabbutton "
        }
        onClick={onSelect}
      >
        {title}
      </button>
    </li>
  );
};

export default VideoTabButton;
