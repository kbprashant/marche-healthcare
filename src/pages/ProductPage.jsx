import { useState, useEffect, useRef } from "react";
import "./css/productpage.css";
import { Layouts } from "../Layouts/Layouts";
import blogImg from "../assets/products/card-img.png";
import function2Img from "../assets/products/function2-img.png";
import functionl0Img from "../assets/products/functional-0.png";
import functionl1Img from "../assets/products/functional-1.png";
import functionl2Img from "../assets/products/functional-2.png";
import functionl3Img from "../assets/products/functional-3.png";
import rangeVideo from "../assets/products/360.mp4"; // Added import for video
import AccordionItem from "../components/AccordionItem";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import d8Video from "../assets/products/d8.mp4";
import ergonomicVideo from "../assets/products/ergonomic.mp4";
import CompatabilityVideo from "../assets/products/Compatability.mp4";
import Lengthofshaft from "../assets/products/Lengthofshaft.mp4";




const faqs = [
  {
    id: 1,
    header: "How is NovaLap 360 D8 sterilized?",
    text: `NovaLap 360 D8 is a reusable instrument. After each procedure, it should be cleaned, vetted, and sterilized by the hospital’s sterile processing team using either autoclave or ETO methods, in accordance with standard sterilization protocols.`,
  },
  {
    id: 2,
    header: "Where does it come from?",
    text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  },
  {
    id: 3,
    header: "Why do we use it?",
    text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,`,
  },
  {
    id: 4,
    header: "Where can I get some?",
    text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
];

const faqProducts = [
  {
    id: 1,
    title: "Fenestrated Forceps / Bipolar Fenestrated Forceps",
    img: "/products/faqimg.png",
    // description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },
  {
    id: 2,
    title: "Maryland Dissector / Bipolar Maryland Dissector",
    img: "/products/faqimg.png",
    // description: "Short description for Product B. Replace with real copy.",
    specs: [
      {
        itemCode: "BTF01-F",
        productDescription: "Sample Forceps B - 30cm",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "30cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
    ],
  },
  {
    id: 3,
    title: "Precise Dissector (Monopolar / Bipolar)",
    img: "/products/faqimg.png",
    description: "Short description for Product C. Replace with real copy.",
    specs: [],
  },
  {
    id: 4,
    title: "Bipolar Blunt Tip Dissector",
    img: "/products/faqimg.png",
    description: "Short description for Product D. Replace with real copy.",
    specs: [],
  },
{
id: 5,
    title: "Cobra Grasper",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 6,
    title: "Tenaculum Forceps",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 7,
    title: "Needle Holder / Precise Needle Holder with Suture Cut",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id:8,
    title: "Clip Applier",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 9,
    title: "Potts Scissors",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 10,
    title: "Round Tip Scissors",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 11,
    title: "Monopolar Scissors",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 12,
    title: "Monopolar Spatula",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 13,
    title: "Monopolar Hook",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 14,
    title: "Vessel Sealer Extend",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

  {
id: 15,
    title: "Clinch Forceps",
    img: "/products/faqimg.png",
    description: "Short description for Product A. Replace with real copy.",
    specs: [
      {
        itemCode: "AUF01-F",
        productDescription: "Fenestrated Forceps-38cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "38cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01-L",
        productDescription: "Fenestrated Forceps-38cm-Lock",
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "38cm",
        lock: "O",
        electrode: "N/A",
        unitsBox: "1EA/BOX",
        uses: "Single Use",
      },
      {
        itemCode: "AUF01S-F",
        productDescription: "Fenestrated Forceps-25cm",
        jawLength: "",
        shaftDiameter: "",
        shaftLength: "25cm",
        lock: "N/A",
        electrode: "N/A",
        unitsBox: "",
        uses: "Single Use",
      },
    ],
  },

];



const ProductPage = () => {
  const [activeProducts, setActiveProducts] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const productActionRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleToggleProducts = (id) => {
    setActiveProducts(activeProducts === id ? null : id);
  };

  const handleToggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleInvertOn = () => {
    productActionRef.current?.classList.add("invert-bg");
  };
  const handleInvertOff = () => {
    productActionRef.current?.classList.remove("invert-bg");
  };

  const handleHoverOpenProducts = (id) => {
    setActiveProducts(id);
  };
  const handleHoverCloseProducts = () => {
    setActiveProducts(null);
  };

  return (
    <Layouts title={"Product-Page"}>
      <main className="product-main">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="content"
        >
          <h1>Healthcare Innovation, Made Simple</h1>
          <p>
            Designing smart, affordable, and accessible medical technologies for hospitals and clinics everywhere.
          </p>
        </motion.div>
      </main>

      <span id="marcherobo"></span>

      <section className="product-action" ref={productActionRef}>
        <div className="short-about">
          <div>
            <h2>NovaLap 360 D8</h2>
            <p>
              NovaLap 360D8 is a multi-DoF articulating laparoscopic system that
              delivers robotic-like dexterity without robotic infrastructure.
            </p>
            <br />
            <a
              href="#complete-lineup"
              className="btn-outline"
              onMouseEnter={handleInvertOn}
              onMouseLeave={handleInvertOff}
            >
              <strong>Complete lineup</strong>
            </a>
          </div>
        </div>
      </section>

      <section className="product-range-action">
        <video
          className="product-range-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/products/360rangeofmotion-poster.jpg"
        >
          <source src="/products/novolab.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="product-functions">
        <div className="functional functional-1">
          <div className="func-header">
            <h2>How functional</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="content">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="card"
            >
              <img src={blogImg} alt="blog" />
              <div className="card-body">
                <h2>Blog title heading will go here</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="card"
            >
              <img src={blogImg} alt="blog" />
              <div className="card-body">
                <h2>Blog title heading will go here</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="functional functional-2">
          <div className="func-header">
            <h2>How functional</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="content">
            <img src={function2Img} alt="tool" />
            <div className="card-body">
              <h2>Blog title heading will go here</h2>
              <p>
                When the locking mechanism is activated UP/DOWN, LEFT/RIGHT
                articulating joint is fixed and cannot move, But OPEN/CLOSE action
                of End-Tool is possible.
              </p>
            </div>
          </div>
        </div>
<motion.div
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.7 }}
  className="functional-desc"
>
  <video
    className="functional-video"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src={rangeVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="content">
    <h2>360° End-Effector Rotation</h2>
    <p>
      The NovaLap 360 D8 is designed to move beyond the natural limitations of the human hand. 
      Its unique 360° end-effector rotation provides surgeons with full circular motion inside the body, 
      enabling greater precision and access to challenging angles. 
      This innovation delivers a natural “feel like hands” experience, 
      enhancing control during delicate procedures. 
      As a result, surgeons can perform seamless suturing, 
      dissection, and knot tying—even in the tightest anatomical spaces.
    </p>
  </div>
</motion.div>


        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="functional-desc"
        >
          <div className="content">
            <h2>8 Degrees of Freedom (D8)</h2>
            <p>
              NovaLap 360 D8 offers eight degrees of freedom for advanced articulation.
              At its core, the end-effector consists of two individual parts that can function independently,
              giving surgeons precise and controlled movement without relying on interdependent mechanisms.
              This design ensures smooth, intuitive control for complex surgical maneuvers,
              while maintaining simplicity and ease of use.
            </p>
          </div>

          <video
            className="functional-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={ergonomicVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="functional-desc"
        >
          <div className="content-img">
            <img src={functionl2Img} alt="functional-2" />
          </div>
          <div className="content">
            <h2>Tactile Feedback</h2>
            <p>
              One of the defining features of NovaLap 360 D8 is its ability to provide direct tactile sensation during surgery.
               By allowing surgeons to feel tissue resistance in real time, it enhances precision and safety, 
               particularly in delicate dissections.
                This natural feedback helps improve accuracy while preserving the surgeon’s sense of touch.

              </p>
              
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="functional-desc"
        >
          <div className="content">
            <h2>Ergonomic Handle with Finger Support</h2>
            <p>
              The handle of NovaLap 360 D8 is designed to enhance comfort and reduce fatigue during prolonged surgeries.
              It features finger rests for steady handling and customizable silicone sleeves in varied sizes, 
              allowing surgeons to choose the best fit for their hand. 
              This adaptability ensures both stability and confidence while maintaining a lightweight, ergonomic design.
            </p>
          </div>
          <video
            className="functional-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={ergonomicVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

       <motion.div
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.7 }}
  className="functional-desc"
>
  <video
    className="functional-video"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    controls
  >
    <source src={CompatabilityVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="content">
    <h2>Compatibility</h2>
    <p>
      NovaLap 360 D8 is designed for seamless compatibility with equipment already available in the operating
      room, including existing laparoscopic systems. 
      Its plug-and-play design ensures smooth adoption without requiring additional specialized instruments, 
      modifications, or workflow changes.
    </p>
  </div>
</motion.div>


      <motion.div
  initial={{ opacity: 0, x: 100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.7 }}
  className="functional-desc"
>
  <div className="content">
    <h2>Optimal Instrument Lengths</h2>
    <p>
      To accommodate diverse surgical needs, NovaLap 360 D8 is available in multiple instrument 
      lengths (25 cm, 38 cm, and 48 cm). Each length is engineered for compatibility with standard 
      laparoscopic ports, providing surgeons with the ideal reach and accessibility for different procedures.
      This flexibility supports both comfort in handling and seamless integration into existing 
      workflows.
    </p>
  </div>

  <video
    className="functional-video"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    controls
  >
    <source src={Lengthofshaft} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</motion.div>

        <motion.div
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2, duration: 0.7 }}
  className="functional-desc"
>
  <video
    className="functional-video"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  >
    <source src={rangeVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="content">
    <h2>Versatile</h2>
    <p>
      NovaLap 360 D8 is built with a range of specialized end-effector instruments, 
      each designed for a specific function such as grasping, cutting, dissecting, 
      or suturing. Surgeons can select the optimal instrument for each task while benefiting 
      from the same ergonomic handle and interface across all instruments, ensuring comfort, 
      precision, and control throughout the procedure.
    </p>
  </div>
</motion.div>





{/* 
        <div className="functional functional-3">
          <div className="func-header">
            <h2>Product Name</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <img src="./products/specification.png" alt="specification" />
        </div>

        <div className="functional functional-3">
          <div className="func-header">
            <h2>Product Name</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <img src="./products/specification.png" alt="specification" />
        </div> */}

        <div className="functional fav-question complete-lineup">
          <div className="func-header">
            <h2>Complete lineup</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing et.</p>
          </div>
          <div className="content">
            {faqProducts.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => handleHoverOpenProducts(p.id)}
                onMouseLeave={handleHoverCloseProducts}
              >
                <AccordionItem
                  active={activeProducts}
                  handleToggle={handleToggleProducts}
                  faq={{
                    header: p.title,
                    id: p.id,
                    text: (
                      <div className="product-row">
                        <div className="product-image">
                          <img src={p.img} alt={p.title} />
                          <h3>{p.title}</h3>
                          <p>{p.description}</p>
                        </div>
                        <div className="product-table">
                          {p.specs.length > 0 ? (
                            <table>
                              <thead>
                                <tr>
                                  {/* <th>Item Code</th> */}
                                  {/* <th>Description</th> */}
                                  <th>Jaw Length</th>
                                  <th>Shaft Diameter</th>
                                  <th>Shaft Length</th>
                                  {/* <th>Lock</th> */}
                                 {<th>Electrode</th> }
                                  {/* <th>Units/Box</th> */}
                                  <th>Uses</th>
                                </tr>
                              </thead>
                              <tbody>
                                {p.specs.map((spec, i) => (
                                  <tr key={i}>
                                    {/* <td>{spec.itemCode}</td> */}
                                    {/* <td>{spec.productDescription}</td> */}
                                    <td>{spec.jawLength || "-"}</td>
                                    <td>{spec.shaftDiameter || "-"}</td>
                                    <td>{spec.shaftLength || "-"}</td>
                                    {/* <td>{spec.lock}</td> */}
                                    <td>{spec.electrode}</td>
                                    {/* <td>{spec.unitsBox || "-"}</td> */}
                                    <td>{spec.uses}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p>No specifications available.</p>
                          )}
                        </div>
                      </div>
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="functional fav-question">
          <div className="func-header">
            <h2>FAQs</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              varius enim in eros elementum tristique.
            </p>
          </div>
          <div className="content">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                onMouseEnter={() => setActiveFaq(faq.id)}
                onMouseLeave={() => setActiveFaq(null)}
              >
                <AccordionItem
                  active={activeFaq}
                  handleToggle={handleToggleFaq} // keeps click functionality
                  faq={faq}
                />
              </div>
            ))}
          </div>
          <div className="fav-footer">
            <h2>Still have a question?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>
              <Link to="/contact">Contact</Link>
            </button>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default ProductPage;
