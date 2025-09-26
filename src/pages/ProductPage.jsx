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
  header: "Is NovaLap 360 D8 reusable?",
  text: (
    <>
      <b>Yes</b>, NovaLap 360 D8 is a <b>reusable instrument</b>. After each procedure, it should be cleaned, vetted, and sterilized by the hospital’s sterile processing team using either <b>autoclave or ETO methods</b>, in accordance with standard sterilization protocols.
    </>
  )
},


 
  {
    id: 2,
    header: "Is special training required to use NovaLap 360 D8?",
    text: (
      <><b>No</b> special training is required for surgeons already familiar with conventional or robotic laparoscopy. For new beginners, the instrument has a very <b>short learning curve</b>. Additionally, we provide <b>demo videos</b> on our website and offer <b>in-person demonstrations</b> for better familiarization.,</>
      
      
    )
    },

 
   {
    id: 3,
    header: "Is NovaLap 360 D8 compatible with existing laparoscopic and electrosurgical systems?",
    text: (
  <>
    <br />
    <b>Yes</b>. NovaLap 360 D8 is designed for seamless integration with <b>standard laparoscopic and electrosurgical systems</b> already available in the operating room. It requires no additional specialized setup.
  </>
)
  },

  {
    id: 4,
    header: "What types of surgeries can NovaLap 360 D8 be used for?",
    text: (
      <>
      NovaLap 360 D8 Family have <b>versatile instruments</b> and suitable for a wide range of minimally invasive procedures, including <b>general surgery, gynecology, urology, cardiothoracic surgery, and other advanced laparoscopic applications</b>.,
      </>
    )
  },


  {
    id: 5,
    header: "What does “D8” mean in NovaLap 360 D8?",
    text: (
      <>
      “D8” stands for <b> 8 Degrees of Freedom, a world-first innovation in laparoscopic instrumentation</b>. Each end-effector can be moved individually and independently, giving surgeons unmatched precision and flexibility. This breakthrough offers articulation beyond conventional instruments and even surpasses current robotic systems,      
      </>
    )
  },

   {
    id: 6,
    header: "Does NovaLap 360 D8 reduce surgical time?",
    text: (
      <>
        <b>Yes</b>. Unlike conventional laparoscopic instruments or robotic systems—which often require long setup times—NovaLap <b>360 D8 is ready to use with 360° end-effector rotation, 8 degrees of freedom, and tactile feedback</b>, enabling surgeons to operate more precisely with fewer adjustments. This efficiency can help shorten overall surgical time.    
      </>
    )
  },
];

const faqProducts = [
  {
    id: 1,
    title: "Fenestrated Forceps / Bipolar Fenestrated Forceps",
    img: "/products/faqimg.png",
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Biplor",
        uses: "Multiple Uses",
      },
      ,
    ],
  },
  {
    id: 2,
    title: "Maryland Dissector / Bipolar Maryland Dissector",
    img: "/products/faqimg.png",

    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Monopolar/Biplor",
        uses: "Multiple Uses",
      },
    ],
  },
  {
    id: 3,
    title: "Precise Dissector (Monopolar / Bipolar)",
    img: "/products/faqimg.png",
    
    specs: [
        {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Monopolar/Biplor",
        uses: "Multiple Uses",
      },
    ],
  },
  {
    id: 4,
    title: "Bipolar Blunt Tip Dissector",
    img: "/products/faqimg.png",
        specs: [

         {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Biplor",
        uses: "Multiple Uses",
      },
        ],
  },
{
id: 5,
    title: "Cobra Grasper",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "N/A",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 6,
    title: "Tenaculum Forceps",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "N/A",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 7,
    title: "Needle Holder / Precise Needle Holder with Suture Cut",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "N/A",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id:8,
    title: "Clip Applier",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "N/A",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 9,
    title: "Potts Scissors",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "N/A",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 10,
    title: "Round Tip Scissors",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "N/A",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 11,
    title: "Monopolar Scissors",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Monopolar",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 12,
    title: "Monopolar Spatula",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Monopolar",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 13,
    title: "Monopolar Hook",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Monopolar",
        uses: "Multiple Uses",
      },
      
    ],
  },

  {
id: 14,
    title: "Vessel Sealer Extend",
    img: "/products/faqimg.png",
    
    specs: [
       {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "Biplor",
        uses: "Multiple Uses",
      },
          ],
  },

  {
id: 15,
    title: "Clinch Forceps",
    img: "/products/faqimg.png",
    
    specs: [
      {
        jawLength: "18mm",
        shaftDiameter: "8mm",
        shaftLength: "25cm,38cm,45cm",
        electrode: "N/A",
        uses: "Multiple Uses",
      },
      
    ],
  },

];



const ProductPage = () => {
  const [activeProducts, setActiveProducts] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const productActionRef = useRef(null);
  const location = useLocation();
  const hoverCloseTimeout = useRef(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Hover capability detection
  const isHoverMode = useRef(
    window.matchMedia('(hover: hover)').matches &&
    window.matchMedia('(pointer: fine)').matches
  );

  // Product toggle (used for touch/mobile)
  const handleToggleProducts = (id) => {
    setActiveProducts(prev => (prev === id ? null : id));
  };

  // FAQ toggle
  const handleToggleFaq = (id) => {
    setActiveFaq(prev => (prev === id ? null : id));
  };

  // Desktop hover open
  const handleHoverOpenProducts = (id) => {
    if (!isHoverMode.current) return;
    if (hoverCloseTimeout.current) {
      clearTimeout(hoverCloseTimeout.current);
      hoverCloseTimeout.current = null;
    }
    setActiveProducts(id);
  };

  // Gentle delayed close so it doesn’t snap shut instantly
  const handleHoverCloseProducts = () => {
    if (!isHoverMode.current) return;
    if (hoverCloseTimeout.current) clearTimeout(hoverCloseTimeout.current);
    hoverCloseTimeout.current = setTimeout(() => {
      setActiveProducts(null);
      hoverCloseTimeout.current = null;
    }, 140); // tweak delay if desired (120–180ms works well)
  };

  const handleInvertOn = () => {
    productActionRef.current?.classList.add("invert-bg");
  };
  const handleInvertOff = () => {
    productActionRef.current?.classList.remove("invert-bg");
  };

  const leftColumnProducts  = faqProducts.filter((_, i) => i % 2 === 0);
  const rightColumnProducts = faqProducts.filter((_, i) => i % 2 === 1);

  return (
    <Layouts title="Product-Page">
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
{/* Product Action */}
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
        href="#complete-lineup"   // ✅ points to lineup heading
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
            <source src={d8Video} type="video/mp4" />
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
            <h2>Natural Haptic</h2>
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
>
  <source src={CompatabilityVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>


  <div className="content">
    <h2>Compatibility</h2>
    <p>
      NovaLap 360 D8 is designed for seamless compatibility with equipment already available in the operating
      room, including existing laparoscopic systems and electrosurgical  systems or energy devices . 
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
    onContextMenu={(e) => e.preventDefault()}
  >
    <source src={Lengthofshaft} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</motion.div>

      
         <div className="functional fav-question complete-lineup" id="complete-lineup">
      <div className="func-header">
        <h2>NovaLap 360 D8 lineup</h2>
        <p>Complete and Versatile Instruments for Every Surgical Need</p>
      </div>
      <div className="lineup-columns">
        <div className="lineup-column">
          {leftColumnProducts.map(p => (
            <div
                key={p.id}
                onMouseEnter={() => handleHoverOpenProducts(p.id)}
                onMouseLeave={handleHoverCloseProducts}
              >
                <AccordionItem
                  active={activeProducts}
                  handleToggle={handleToggleProducts}
                  disableClick={isHoverMode.current}
                  faq={{
                    header: p.title,
                    id: p.id,
                    text: (
                      <div className="product-row">
                        <div className="product-image">
                          <img src={p.img} alt={p.title} />
                          <p>{p.description}</p>
                        </div>
                        <div className="product-table">
                          {p.specs.length > 0 ? (
                            <table>
                              <thead>
                                <tr>
                                  <th>Jaw Length</th>
                                  <th>Shaft Diameter</th>
                                  <th>Shaft Length</th>
                                  <th>Electrode</th>
                                  <th>Uses</th>
                                </tr>
                              </thead>
                              <tbody>
                                {p.specs.map((spec, i) => (
                                  <tr key={i}>
                                    <td>{spec.jawLength || '-'}</td>
                                    <td>{spec.shaftDiameter || '-'}</td>
                                    <td>{spec.shaftLength || '-'}</td>
                                    <td>{spec.electrode}</td>
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
                    )
                  }}
                />
              </div>
          ))}
        </div>

        <div className="lineup-column">
          {rightColumnProducts.map(p => (
            <div
                key={p.id}
                onMouseEnter={() => handleHoverOpenProducts(p.id)}
                onMouseLeave={handleHoverCloseProducts}
              >
                <AccordionItem
                  active={activeProducts}
                  handleToggle={handleToggleProducts}
                  disableClick={isHoverMode.current}
                  faq={{
                    header: p.title,
                    id: p.id,
                    text: (
                      <div className="product-row">
                        <div className="product-image">
                          <img src={p.img} alt={p.title} />
                          <p>{p.description}</p>
                        </div>
                        <div className="product-table">
                          {p.specs.length > 0 ? (
                            <table>
                              <thead>
                                <tr>
                                  <th>Jaw Length</th>
                                  <th>Shaft Diameter</th>
                                  <th>Shaft Length</th>
                                  <th>Electrode</th>
                                  <th>Uses</th>
                                </tr>
                              </thead>
                              <tbody>
                                {p.specs.map((spec, i) => (
                                  <tr key={i}>
                                    <td>{spec.jawLength || '-'}</td>
                                    <td>{spec.shaftDiameter || '-'}</td>
                                    <td>{spec.shaftLength || '-'}</td>
                                    <td>{spec.electrode}</td>
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
                    )
                  }}
                />
              </div>
          ))}
        </div>
      </div>
    </div>

        <div className="functional fav-question">
          <div className="func-header">
            <h2>FAQs</h2>
            <p>
              Everything You Need to Know About Our Next-Generation Laparoscopic Instrument.
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
            {/* <button>
              <Link to="/contact">Contact</Link>
            </button> */}
            <a
        href="/contact"   // ✅ points to lineup heading
        className="btn-outline"
        onMouseEnter={handleInvertOn}
        onMouseLeave={handleInvertOff}
      >
        <strong>Contact</strong>
      </a>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default ProductPage;
