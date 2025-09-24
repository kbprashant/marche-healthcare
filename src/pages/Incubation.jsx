import React from "react";
import { Layouts } from "../Layouts/Layouts";
import "./Incubation.css";

const Incubation = () => {
  return (
    <Layouts>
      {/* Banner Section */}
      <section className="incubation-banner">
        <div>
          <h1>Incubation Program</h1>
          <h1>Empowering Healthcare Startups</h1>
          <h1>Innovation | Mentorship | Growth</h1>
        </div>
      </section>

      {/* Content Section */}
      <div className="incubation-container">
        <p>
          The <strong>Marche Healthcare Incubation Program</strong> is designed
          to support innovative healthcare startups, entrepreneurs, and
          researchers who are building solutions that improve patient outcomes
          and advance medical technologies.
        </p>

        <h2>1. What We Offer</h2>
        <ul>
          <li>
            <strong>Mentorship:</strong> Guidance from industry experts,
            healthcare professionals, and successful entrepreneurs.
          </li>
          <li>
            <strong>Infrastructure:</strong> Access to co-working spaces,
            laboratories, and testing facilities.
          </li>
          <li>
            <strong>Funding Opportunities:</strong> Investor connects, grants,
            and seed funding support.
          </li>
          <li>
            <strong>Networking:</strong> Partnerships with hospitals, research
            institutions, and global healthcare leaders.
          </li>
          <li>
            <strong>Training:</strong> Business development, compliance, and
            technology workshops.
          </li>
        </ul>

        <h2>2. Who Can Apply?</h2>
        <p>
          We welcome applications from startups, innovators, and researchers who
          are working in the following areas:
        </p>
        <ul>
          <li>Medical devices and diagnostics</li>
          <li>Digital health platforms</li>
          <li>AI & Machine Learning in healthcare</li>
          <li>Biotechnology and life sciences</li>
          <li>Pharmaceutical innovations</li>
          <li>Telemedicine and remote care</li>
        </ul>

        <h2>3. Program Duration</h2>
        <p>
          Our incubation program typically runs for <strong>6–12 months</strong>
          , depending on the stage of the startup and its unique requirements.
        </p>

        <h2>4. Benefits of Joining</h2>
        <ul>
          <li>Personalized mentorship tailored to your business goals.</li>
          <li>Opportunities for pilot projects with partner hospitals.</li>
          <li>Legal, regulatory, and IP support.</li>
          <li>Access to healthcare-focused investors.</li>
          <li>Enhanced visibility through Marche Healthcare events.</li>
        </ul>

        <h2>5. How to Apply</h2>
        <p>
          Interested startups can apply by submitting an application through our
          official website. Shortlisted applicants will be invited for an
          interview and pitch session.
        </p>

        <p className="highlight-text">
          🚀 Join the Marche Healthcare Incubation Program and take your
          innovation from <strong>idea to impact</strong>.
        </p>
      </div>

      {/* Footer Image */}
      <div className="incubation-footer">
        <img
          src="/images/incubation-footer.png"
          alt="Incubation Footer"
          className="footer-img"
        />
      </div>
    </Layouts>
  );
};

export default Incubation;
