import React from "react";
import { Layouts } from "../Layouts/Layouts";
import "./css/newsevent.css";

const NewsEvent = () => {
  return (
    <Layouts title="News & Events">
      {/* Banner Section */}
      <section className="news-banner">
        <div className="banner-content">
          <h1>Marche Healthcare News & Events</h1>
          <p>
            Stay updated with the latest news, upcoming events, and breakthroughs
            in healthcare.
          </p>
          <a href="#news-events" className="btn-primary">
            Explore News & Events
          </a>
        </div>
      </section>

      {/* Content Section */}
      <div className="news-container" id="news-events">
        <h2>1. Latest News</h2>
        <ul>
          <li>📰 "Marche Healthcare launches new telemedicine platform – July 2025"</li>
          <li>💡 "AI-driven diagnostics tool approved for clinical trials"</li>
          <li>🌍 "Partnership with Global Health Ventures for research grants"</li>
          <li>🏥 "Expansion of healthcare innovation lab to 3 new cities"</li>
        </ul>

        <h2>2. Upcoming Events</h2>
        <ul>
          <li>📅 "Healthcare Innovation Summit 2025 – September 12-14"</li>
          <li>🎤 "Webinar: Advances in Minimally Invasive Surgery – August 20"</li>
          <li>🏆 "Marche Startup Pitch Competition – October 5"</li>
          <li>🌐 "Virtual Conference: AI in Healthcare – November 10"</li>
        </ul>

        <h2>3. How to Participate</h2>
        <p>
          Join our events by registering through the official Marche Healthcare website. 
          Stay informed about upcoming webinars, summits, and competitions to network 
          with healthcare leaders and innovators.
        </p>

        <h2>4. Subscribe for Updates</h2>
        <p>
          Sign up for our newsletter to receive the latest news and event updates directly 
          in your inbox. Stay connected and never miss an important update.
        </p>

        <p className="highlight-text">
          🚀 Be part of the <strong>Marche Healthcare Community</strong> and engage
          with innovations shaping the future of healthcare.
        </p>
      </div>

      {/* Footer Image */}
      <div className="news-footer">
        <img
          src="/images/news-footer.png"
          alt="News & Events Footer"
          className="footer-img"
        />
      </div>
    </Layouts>
  );
};

export default NewsEvent;
