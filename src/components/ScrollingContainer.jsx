import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./css/scrollingcontainer.css";

function ScrollingContainer({
  heading,
  bgimg,
  subHeading,
  mobileView,
  setMobileView,
}) {
  const [zoomHeight, setZoomHeight] = useState(0);
  const [zoomWidth, setZoomWidth] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65, 1],
    [0, 1, 1, 1]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 1],
    [1, 1, 1.38, 1.38]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 1],
    ["0%", "0%", "24%", "24%"]
  );
  const opacityText = useTransform(
    scrollYProgress,
    [0, 0.4, 0.42, 1],
    [0, 0, 1, 1]
  );
  const yText = useTransform(
    scrollYProgress,
    [0, 0.4, 0.42, 1],
    ["15px", "15px", "1px", "1px"]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["auto", "none", "none"]
  );
  useEffect(() => {
    setZoomWidth(window.innerWidth * 0.67);
    setZoomHeight(window.innerHeight * 0.67);
  }, []);

  return (
    <div>
      <div style={{ position: "relative", marginBottom: "100px" }}>
        {mobileView ? (
          <div>
            <div className="scrollcontainer">
              <div className="stickydiv">
                <div
                  className="zoomoutdiv"
                  style={{
                    width:"100%",
                    opacity,
                    scale,
                    y,
                  }}
                >
                  <div
                    className="bgimagediv"
                    style={{ backgroundImage: `url(${bgimg})`, borderRadius }}
                  >
                    <span style={{ display: "none" }}>something</span>
                  </div>
                </div>
              </div>
              <div className="texthoverdiv">
                <div className="textdiv">
                  <div
                    className="texthovered"
                    style={{} }
                  >
                    <h3 style={{fontSize:"2.5rem"}}>{heading}</h3>
                    <h4 style={{fontSize:"1rem"}}>{subHeading}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="fogdiv"></div>
          </div>
        ) : (
          <>
            <div className="scrollcontainer">
              <div className="stickydiv">
                <motion.div
                  className="zoomoutdiv"
                  style={{
                    height: zoomHeight,
                    width: zoomWidth,
                    opacity,
                    scale,
                    y,
                  }}
                >
                  <motion.div
                    className="bgimagediv"
                    style={{ backgroundImage: `url(${bgimg})`, borderRadius }}
                  >
                    <span style={{ display: "none" }}>something</span>
                  </motion.div>
                </motion.div>
              </div>
              <div className="texthoverdiv">
                <div className="textdiv">
                  <motion.div
                    className="texthovered"
                    style={{ opacity: opacityText, y: yText }}
                  >
                    <h3>{heading}</h3>
                    <h4>{subHeading}</h4>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="fogdiv"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default ScrollingContainer;
