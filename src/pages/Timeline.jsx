import { motion, useScroll, useTransform } from "framer-motion";

const ScrollAnimation = () => {
  const { scrollYProgress } = useScroll(); // Get scroll progress (0 to 1)

  // Transform X position based on scroll progress
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div style={{ height: "200vh", padding: "50px" }}>
      <motion.div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
          position: "fixed",
          top: "50%",
          y:x,
        }}
      />
    </div>
  );
};

export default ScrollAnimation;
