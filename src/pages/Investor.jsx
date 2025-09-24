import React from "react";
import { Layouts } from "../Layouts/Layouts";
import "./css/investor.css";

const Investor = () => {
  return (
    <Layouts title="Investor">
      {/* Full Width Banner Image */}
      <section className="investor-banner">
        <img
          src="/images/investor1.jpg"
          alt="Investor Banner"
          className="banner-img"
        />
        <div className="banner-content">
          <h1>Investors</h1>
          <p>Partner with Marche Healthcare & Shape the Future of Healthcare</p>
        </div>
      </section>

      {/* Content Section */}
      <div className="investor-container">
        <h2>About Our Investor Network</h2>
        <div className="content-row">
          <div className="text-column">
            <p>
              The <strong>Marche Healthcare Investor Network</strong> provides
              unique opportunities for investors to support groundbreaking
              healthcare innovations while achieving impactful returns.
            </p>
            <p>
              Our network connects visionary investors with promising startups
              that are transforming patient care and medical technologies.
            </p>
          </div>
          <div className="image-column">
            <img src="/images/investor-footer.png" alt="Investor Network" />
          </div>
        </div>

        <h3>Why Invest with Us?</h3>
        <div className="content-row">
          <div className="text-column">
            <ul>
              <li>
                <strong>Curated Startups:</strong> Access to pre-vetted healthcare
                startups with strong growth potential.
              </li>
              <li>
                <strong>Diverse Portfolio:</strong> Opportunities across medical
                devices, biotech, digital health, and AI-driven solutions.
              </li>
              <li>
                <strong>Early-Stage Access:</strong> Be among the first to fund
                disruptive healthcare innovations.
              </li>
              <li>
                <strong>Global Reach:</strong> Partner with innovators and hospitals
                worldwide.
              </li>
            </ul>
          </div>
        </div>

        <h3>Sample Investors in Our Network</h3>
        <ul>
          <li>💼 MedTech Capital Partners</li>
          <li>🌍 Global Health Ventures</li>
          <li>🏥 LifeScience Angels</li>
          <li>💡 Healthcare Innovation Fund</li>
          <li>🚀 NextGen Biotech Investors</li>
        </ul>

        <h3>Benefits for Investors</h3>
        <ul>
          <li>Exclusive access to deal flow in the healthcare sector.</li>
          <li>Participation in demo days and pitch sessions.</li>
          <li>Regular updates on portfolio startup performance.</li>
          <li>Opportunities to co-invest with global healthcare leaders.</li>
        </ul>

        <h3>How to Join</h3>
        <p>
          Interested investors can register through our official website.
          Approved members will gain access to our curated list of healthcare
          startups and upcoming investment opportunities.
        </p>

        <p className="highlight-text">
          💡 Be a part of the <strong>Marche Healthcare Investor Network</strong>{" "}
          and help accelerate innovations that make a global impact.
        </p>
      </div>
    </Layouts>
  );
};

export default Investor;
