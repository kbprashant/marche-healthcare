// src/components/ModelViewer3D.jsx
import React, { useEffect, useRef } from "react";
import sceneModel from "../assets/home/scene.gltf?url";
import "./css/modelviewer3d.css";

const CDN_SRC = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";

export default function ModelViewer3D({ src = sceneModel, alt = "3D model", height = 500 }) {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // load model-viewer module once
    if (!window.customElements || !window.customElements.get("model-viewer")) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = CDN_SRC;
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div className="model-3d-section" aria-hidden={false}>
      <div className="model-viewer-container">
        <model-viewer
          ref={modelViewerRef}
          src={src}
          alt={alt}
          auto-rotate
          camera-controls
          interaction-prompt="auto"
          exposure="1"
          camera-orbit="0deg 75deg 80%"
          field-of-view="45deg"
          style={{
            width: "100%",
            height: `${height}px`,
            borderRadius: 8,
            display: "block",
          }}
        >
          {/* Fallback for browsers without web component support */}
          <div style={{ padding: 20 }}>
            {/* <p>Interactive 3D preview not supported in this browser.</p>
            <p>
              You can download the model file or view it in a supported browser.
            </p> */}
          </div>
        </model-viewer>
      </div>
    </div>
  );
}