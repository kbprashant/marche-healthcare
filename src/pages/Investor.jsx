import React from "react";
import { Layouts } from "../Layouts/Layouts";
import "./css/investor.css";

const Investor = () => {
  return (
    <Layouts>
      {/* Banner Section */}
      <section className="investor-banner">
        <div>
          <h1>Investors</h1>
          <h1>Partner with Marche Healthcare</h1>
          <h1>Shape the Future of Healthcare</h1>
        </div>
      </section>

      {/* Content Section */}
      <div className="investor-container">
        <p>
          The <strong>Marche Healthcare Investor Network</strong> provides
          unique opportunities for investors to support groundbreaking
          healthcare innovations while achieving impactful returns. Our network
          connects visionary investors with promising startups that are
          transforming patient care and medical technologies.
        </p>

        <h2>1. Why Invest with Us?</h2>
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

        <h2>2. Sample Investors in Our Network</h2>
        <ul>
          <li>💼 MedTech Capital Partners</li>
          <li>🌍 Global Health Ventures</li>
          <li>🏥 LifeScience Angels</li>
          <li>💡 Healthcare Innovation Fund</li>
          <li>🚀 NextGen Biotech Investors</li>
        </ul>

        <h2>3. Benefits for Investors</h2>
        <ul>
          <li>Exclusive access to deal flow in the healthcare sector.</li>
          <li>Participation in demo days and pitch sessions.</li>
          <li>Regular updates on portfolio startup performance.</li>
          <li>Opportunities to co-invest with global healthcare leaders.</li>
        </ul>

        <h2>4. How to Join</h2>
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

      {/* Footer Image */}
      <div className="investor-footer">
        <img
          src="/images/investor-footer.png"
          alt="Investor Footer"
          className="footer-img"
        />
      </div>
    </Layouts>
  );
};

export default Investor;
