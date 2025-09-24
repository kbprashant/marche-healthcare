import React from "react";
import { Layouts } from "../Layouts/Layouts";
import "./css/incubation.css";

const Incubation = () => {
  return (
    <Layouts>
      {/* Full Width Banner Image */}
      <section className="incubation-banner">
        <img src="/Incubation/3.jpg" alt="Incubation Banner" className="banner-img" />
        <div className="banner-content">
          <h1>Marche Healthcare Incubation</h1>
          <p>From Idea to Impact in Healthcare Innovation</p>
        </div>
      </section>

      {/* Content Section */}
      <div className="incubation-container">
        <h2>About Our Incubation</h2>
        <div className="content-row">
          <div className="text-column">
            <p>
              Marche Healthcare Pvt. Ltd. is proudly incubated at the{" "}
              <strong>Atal Incubation Centre (AIC), Pondicherry</strong>.
            </p>
            <p>
              Being part of AIC has given us the opportunity to connect with mentors,
              access innovation-driven resources, and grow alongside a network of
              startups dedicated to solving India’s most pressing healthcare challenges.
            </p>
          </div>
          <div className="image-column">
            <img src="/Incubation/1.jpg" alt="Incubation 1" />
          </div>
        </div>

        <h3>Why Incubation Matters</h3>
        <div className="content-row reverse">
          <div className="text-column">
            <ul>
              <li>
                <strong>Support for Innovation:</strong> Access to expert guidance in medical device development and commercialization.
              </li>
              <li>
                <strong>Infrastructure & Networking:</strong> State-of-the-art facilities and collaboration with other innovators in the healthcare ecosystem.
              </li>
              <li>
                <strong>Compliance & Standards:</strong> Guidance in implementing global frameworks such as ISO 13485 and regulatory pathways for medical devices.
              </li>
              <li>
                <strong>Sustainable Growth:</strong> A nurturing environment to refine ideas into scalable, impactful solutions.
              </li>
            </ul>
          </div>
          <div className="image-column">
            <img src="/Incubation/2.jpg" alt="Incubation 2" />
            {/* <img src="/Incubation/4.jpg" alt="Incubation 3" /> */}
          </div>
        </div>

        <h3>Marche Healthcare’s Journey at AIC</h3>
        <div className="content-row">
          <div className="text-column">
            <p>
              Our flagship innovation, <strong>NovaLap 360 D8</strong>, was conceptualized and refined during our incubation period.
              With the support of AIC, we are building not just devices, but also a strong foundation of R&D, Quality Management,
              and Global Compliance to bring world-class surgical innovations from India to the world.
            </p>
            <p>
              Being incubated at Atal Incubation Centre, Pondicherry, reaffirms our mission
              to combine clinical insight, engineering expertise, and entrepreneurial spirit to
              shape the future of minimally invasive surgery.
            </p>
          </div>
          <div className="image-column">
            <img src="/Incubation/5.jpg" alt="Incubation 4" />
            
          </div>
        </div>
        <div className="side-by-side">
              <img src="/Incubation/6.jpg" alt="Incubation 5" />
              <img src="/Incubation/7.jpg" alt="Incubation 6" />
            </div>

        <p className="highlight-text">— Team Marche Healthcare</p>
      </div>
    </Layouts>
  );
};

export default Incubation;
