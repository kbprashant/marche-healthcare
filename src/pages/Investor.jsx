import React from "react";
import { Layouts } from "../Layouts/Layouts";
import SEOJsonLd from "../components/SEOJsonLd";
import "./css/investor.css";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 0.9, 0.22, 1] },
  viewport: { once: true, margin: "-50px" }
});

const Investor = () => {
  return (
    <Layouts title={"Investors - Marche Healthcare"} description={"Investor relations and opportunities at Marche Healthcare."} canonical="https://marchehealthcare.org/Investor">
      <SEOJsonLd webpage={{ name: 'Investors', description: 'Investor relations and opportunities.', url: 'https://marchehealthcare.org/Investor' }} breadcrumb />
      <section className="investor-banner">
        <div className="investor-banner-text">
          <h3>Investors</h3>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="investor-section">
        <motion.div {...fadeUp(0)} className="section-header">
          {/* <h2>About Our Incubation</h2>
          <p>
            Marche Healthcare Pvt. Ltd. is proudly incubated at the{" "}
            <strong>Atal Incubation Centre (AIC), Pondicherry</strong>, a hub
            fostering healthcare innovation and translational impact.
          </p> */}
        </motion.div>

        <div className="investor-rows">
          <motion.div {...fadeUp(0.05)} className="investor-row">
            <div className="text">
              <h3>Enabling Growth & Collaboration</h3>
              <p>
                Being part of AIC accelerates our access to clinical mentors,
                regulatory insight, and prototyping resources. It empowers us
                to iterate faster and build responsibly within the evolving
                framework of global healthcare requirements.
              </p>
              <p>
                We collaborate with multidisciplinary experts to refine design,
                ergonomics, user safety, and manufacturability—ensuring our
                solutions are scalable and sustainable.
              </p>
            </div>
            <div className="media">
              <img
                src="/Incubation/1.jpg"
                alt="Team Marche working within incubation facilities"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="incubation-row alt">
            <div className="text">
              <h3>Shaping NovaLap 360 D8</h3>
              <p>
                Our flagship innovation, <strong>NovaLap 360 D8</strong>, was
                conceptualized and refined during incubation. Focused
                articulation design, tactile feedback fidelity, and surgeon-first
                usability were matured here.
              </p>
              <p>
                This journey strengthens our mission to bring world-class
                minimally invasive surgical technologies from India to global
                operating rooms—bridging accessibility and advanced capability.
              </p>
            </div>
            <div className="media">
              <img
                src="/Incubation/6.jpg"
                alt="Prototype development imagery for NovaLap 360 D8"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* OPTIONAL IMAGE STRIP (uncomment if you want a visual gallery)
      <section className="incubation-gallery">
        <motion.h3 {...fadeUp(0)}>Inside the Journey</motion.h3>
        <div className="gallery-grid">
          {['2','4','5','7'].map((n,i) => (
            <motion.div key={n} {...fadeUp(0.05 * (i+1))} className="gallery-item">
              <img src={`/Incubation/${n}.jpg`} alt={`Incubation resource ${n}`} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </section>
      */}

      {/* OPTIONAL CTA (uncomment if needed)
      <section className="incubation-cta">
        <motion.div {...fadeUp(0)}>
          <h3>Collaborate With Us</h3>
          <p>
            We welcome strategic partners, clinical collaborators, and research alliances.
            Let’s advance minimally invasive care together.
          </p>
          <a href="/contact" className="btn-outline">
            Get in touch
          </a>
        </motion.div>
      </section>
      */}
    </Layouts>
  );
};

export default Investor;