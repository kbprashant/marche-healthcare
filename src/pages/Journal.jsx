import React from "react";
import { Layouts } from "../Layouts/Layouts";
import "./css/journal.css";

const Journal = () => {
  return (
    <Layouts>
      {/* Banner Section */}
      <section className="journal-banner">
        <div className="banner-content">
          <h1>Marche Healthcare Journals</h1>
          <p>
            Explore the latest research, insights, and innovations shaping
            healthcare worldwide.
          </p>
          <a href="#journals" className="btn-primary">
            Explore Journals
          </a>
        </div>
      </section>

      {/* Content Section */}
      <div className="journal-container" id="journals">
        <p>
          The <strong>Marche Healthcare Journal</strong> provides a platform
          for healthcare professionals, researchers, and innovators to share
          their findings, clinical experiences, and technological advancements.
          Our journal aims to foster collaboration, knowledge dissemination, and
          the growth of healthcare innovations worldwide.
        </p>

        <h2>1. Featured Journals</h2>
        <ul>
          <li>🩺 "Advancements in Minimally Invasive Surgery – 2025"</li>
          <li>💊 "AI Applications in Drug Discovery and Clinical Trials"</li>
          <li>🌐 "Telemedicine Impact on Rural Healthcare Accessibility"</li>
          <li>🔬 "Biotechnology Innovations in Personalized Medicine"</li>
          <li>📊 "Healthcare Data Analytics: Trends and Insights"</li>
        </ul>

        <h2>2. Submission Guidelines</h2>
        <ul>
          <li>Original research articles, reviews, and case studies accepted.</li>
          <li>Manuscripts should follow the standard citation format.</li>
          <li>All submissions undergo peer review for quality and accuracy.</li>
          <li>Ensure ethical compliance and proper patient consent where applicable.</li>
        </ul>

        <h2>3. Benefits of Publishing</h2>
        <ul>
          <li>Global visibility for your research and findings.</li>
          <li>Opportunities for collaboration with healthcare leaders.</li>
          <li>Enhancement of professional reputation and credibility.</li>
          <li>Access to Marche Healthcare conferences and events.</li>
        </ul>

        <h2>4. How to Submit</h2>
        <p>
          Interested authors can submit manuscripts through our official
          website. Once reviewed and approved, articles will be published in
          the next journal edition. For assistance, contact our editorial
          team via the website.
        </p>

        <p className="highlight-text">
          📖 Share your knowledge, advance healthcare research, and be part of
          the <strong>Marche Healthcare Journal</strong> community.
        </p>
      </div>

      {/* Footer Image */}
      <div className="journal-footer">
        <img
          src="/images/journal-footer.png"
          alt="Journal Footer"
          className="footer-img"
        />
      </div>
    </Layouts>
  );
};

export default Journal;
