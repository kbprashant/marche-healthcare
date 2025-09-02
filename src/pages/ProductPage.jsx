import { useState,useEffect } from "react";
import "./css/productpage.css";
import { Layouts } from "../Layouts/Layouts";
import blogImg from "../assets/products/card-img.png";
import function2Img from "../assets/products/function2-img.png";
import functionl0Img from "../assets/products/functional-0.png";
import functionl1Img from "../assets/products/functional-1.png";
import functionl2Img from "../assets/products/functional-2.png";
import functionl3Img from "../assets/products/functional-3.png";
import AccordionItem from "../components/AccordionItem";
import FaqAccordion from "../components/FaqAccordion";
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

import { Element } from "react-scroll";

const faqs = [
  {
    id: 1,
    header: "What is Lorem Ipsum?",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  },
  {
    id: 2,
    header: "Where does it come from?",
    text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. `,
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
    title: "Product Name",
    img: "./products/faqimg.png",
  },
  {
    id: 2,
    title: "Product Name",
    img: "./products/faqimg.png",
  },
  {
    id: 3,
    title: "Product Name",
    img: "./products/faqimg.png",
  },
  {
    id: 4,
    title: "Product Name",
    img: "./products/faqimg.png",
  },
];


const ProductPage = () => {
  const [accordion, setAccordion] = useState(false);
  // last accordion
  const [active, setActive] = useState(null);

  // navigation
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);


  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };
  return (
    <Layouts title={"Product-Page"}>
      <main  className="product-main">
        <motion.div 
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        transition={{ delay:0.5,duration:1}} 
        className="content">
          <h1>Describe what your company does in a few words</h1>
          <p>
            Describe exactly what the company does and what a customer can
            expect when working with the company. Avoid using verbose words or
            phrases.
          </p>
        </motion.div>
      </main>
      <span id="marcherobo"></span>

      <section className="product-action">
        <div className="short-about">
          <div>
            <h2>
              Welcome to
              <br /> Marche HealthCare
            </h2>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Recusandae, obcaecati dolorum? Obcaecati amet est animi atque
              tenetur dicta, voluptates ut, magnam facilis culpa eum sit, quos
              mollitia aspernatur sapiente at.
            </p>
          </div>
        </div>
        <div  className="short-about-action">
          <button className="btn">Instrument name</button>
          <button className="btn-outline">Complete lineup</button>
        </div>
      </section>
      <section className="product-range-action"></section>
      <section className="product-functions">
        <div className="functional functional-1">
          <div className="func-header">
            <h2>How functional</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>

          <div className="content">
            <motion.div initial={{opacity:0,x:-100}} whileInView={{opacity:1, x:0}} transition={{delay:0.1,duration:0.3}} className="card">
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

            <motion.div initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.1,duration:0.3}} className="card">
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className="content">
            <img src={function2Img} alt="tool" />
            <div className="card-body">
              <h2>Blog title heading will go here</h2>
              <p>
                When the locking mechanism is activated UP/DOWN, LEFT/RIGHT
                articulating joint is fixed and cannot move,But OPEN/CLOSE
                action of End-Tool is possible.
              </p>
            </div>
          </div>
        </div>
        <motion.div initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.2,duration:0.7}}  className="functional-desc">
          <div className="content-img">
            <img src={functionl0Img} alt="functionl1Img" />
          </div>
          <div className="content">
            <h2>Tell the visitor what the company name is about</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.dolor interdum nulla, ut commodo diam libero
              vitae erat.dolor interdum nulla, ut commodo diam libero vitae
              erat.dolor interdum nulla, ut commodo diam libero vitae erat.dolor
              interdum nulla, ut commodo diam libero vitae erat.dolor interdum
              nulla, ut commodo diam libero vitae erat.
            </p>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.2,duration:0.7}}  className="functional-desc">
          <div className="content">
            <h2>Tell the visitor what the company name is about</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.dolor interdum nulla, ut commodo diam libero
              vitae erat.dolor interdum nulla, ut commodo diam libero vitae
              erat.dolor interdum nulla, ut commodo diam libero vitae erat.dolor
              interdum nulla, ut commodo diam libero vitae erat.dolor interdum
              nulla, ut commodo diam libero vitae erat.
            </p>
          </div>
          <div className="content-img">
            <img src={functionl1Img} alt="functionl1Img" />
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,x:-100}} whileInView={{opacity:1,x:0}} transition={{delay:0.2,duration:0.7}}  className="functional-desc">
          <div className="content-img">
            <img src={functionl2Img} alt="functionl1Img" />
          </div>
          <div className="content">
            <h2>Tell the visitor what the company name is about</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.dolor interdum nulla, ut commodo diam libero
              vitae erat.dolor interdum nulla, ut commodo diam libero vitae
              erat.dolor interdum nulla, ut commodo diam libero vitae erat.dolor
              interdum nulla, ut commodo diam libero vitae erat.dolor interdum
              nulla, ut commodo diam libero vitae erat.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,x:100}} whileInView={{opacity:1,x:0}} transition={{delay:0.2,duration:0.7}}  className="functional-desc">
          <div className="content">
            <h2>Tell the visitor what the company name is about</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.dolor interdum nulla, ut commodo diam libero
              vitae erat.dolor interdum nulla, ut commodo diam libero vitae
              erat.dolor interdum nulla, ut commodo diam libero vitae erat.dolor
              interdum nulla, ut commodo diam libero vitae erat.dolor interdum
              nulla, ut commodo diam libero vitae erat.
            </p>
          </div>
          <div className="content-img">
            <img src={functionl3Img} alt="functionl1Img" />
          </div>
        </motion.div>

        <div className="functional functional-3">
          <div className="func-header">
            <h2>Product Name</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <img src="./products/specification.png" alt="specification." />
        </div>

        <div className="functional asked-questions">
          <div className="func-header">
            <h2>Completet lineup</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          </div>
          <div className="functional-faq">
            <div className="content-img">
              {faqProducts.map((faq, index) => {
                return <FaqAccordion key={index} index={index} faq={faq} setAcc={setAccordion} currAcc={accordion} />;
              })}


            </div>
            <div className="content">
              <h2>Frequently asked questions</h2>
              <p>
                Frequently asked questions ordered by popularity. Remember that
                if the visitor has not committed to the call to action, they may
                still have questions (doubts) that can be answered.
              </p>
            </div>
          </div>
        </div>

        <div className="functional fav-question">
          <div className="func-header">
            <h2>FAQs</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.{" "}
            </p>
          </div>
          <div className="content">
            {faqs.map((faq, index) => {
              return (
                <AccordionItem
                  key={index}
                  active={active}
                  handleToggle={handleToggle}
                  faq={faq}
                />
              );
            })}
          </div>
          <div className="fav-footer">
            <h2>Still have a question?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
            <button>Contact</button>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default ProductPage;
