import React, { useEffect, useState } from "react";
import { Layouts } from "../Layouts/Layouts"; 
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./css/careers.css";

const jobs = [
  { 
    id: 1, 
    type: "Full Time", 
    title: "Software Engineer", 
    desc: "Build and maintain web apps with scalable backend services, integrate APIs, and collaborate with cross-functional teams. Career opportunities in software engineering are driven by new technologies in automobiles, aviation, data management, telecommunications, factory control, robotics, defense, and security. Software engineers may develop computer games, business applications, operating systems, network control systems, and more. A bachelor's degree or higher is often required to work as a software engineer." 
  },
  { 
    id: 2, 
    type: "Full Time", 
    title: "UI/UX Designer", 
    desc: "Design user interfaces and experiences that are clean, modern, and user-friendly, conducting research and usability testing. They collaborate with product managers, engineers, and marketing teams to ensure designs meet business goals and align with brand guidelines, delivering a cohesive and positive user experience." 
  },
  { 
    id: 3, 
    type: "Internship", 
    title: "Marketing Intern", 
    desc: "Assist marketing campaigns, manage social media, track analytics, and support brand awareness initiatives." 
  },
  { 
    id: 4, 
    type: "Internship", 
    title: "Dev Intern", 
    desc: "Support development team with coding, debugging, testing, and learning real-world development workflows." 
  },
];

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState("Full Time");
  const [jobs, setJobs] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

  useEffect(()=>{
    (async()=>{
      const url = new URL(`${API_BASE}/careers_public_list.php`, window.location.origin);
      url.searchParams.set("type", selectedCategory);
      const res = await fetch(url);
      const data = await res.json();
      setJobs(data?.items || []);
    })();
  }, [selectedCategory]);

  const filteredJobs = jobs;

  const handleApply = (job) => {
    // Navigate to CareersApply page and optionally pass job info via state
    navigate("/careersapply", { state: { job } });
  };

  return (
    <Layouts title="Careers - Marche Healthcare">
      {/* Banner */}
      <div className="banner">
        <div className="banner-text">
          <h3>Careers at Marche Healthcare</h3>
          <p>Join our mission and grow with us </p>
        </div>
      </div>

      {/* Expectations Section */}
      <section className="expectations-section py-20 px-6 md:px-20">
        <div className="expectations-grid md:flex md:items-center md:gap-10">
          <div className="expectations-text md:w-1/2">
            <h2 className="text-3xl font-bold text-[#0c1e3a] mb-4">
              What We Expect at Marche Healthcare
            </h2>
            <h3 className="text-xl font-semibold text-[#0c1e3a] mb-4">
              We don’t just want employees who “fit a job description.” We want individuals who bring:
            </h3>
            <p className="text-gray-600 mb-4">
              At Marche Healthcare, we don’t just hire employees – we nurture changemakers who share our vision of creating a healthier future through innovation, compassion, and technology.
            </p>
            <p className="text-gray-600 mb-4">
              We strongly believe that healthcare is not just about treatment — it’s about people’s lives, their families, and their trust. That’s why we expect every member of our team to embrace our core values of empathy, integrity, and excellence in everything they do.
            </p>
            <h3 className="font-semibold mb-2">Our Expectations</h3>
            <ul className="list-disc ml-5 text-gray-600">
              <li><b>Passion for Healthcare Innovation:</b> Curiosity, creativity, and drive to design impactful solutions.</li>
              <li><b>Commitment to Excellence:</b> Precision, quality, and accountability in all work.</li>
              <li><b>Teamwork and Collaboration:</b> Open communication and positive contribution to the team.</li>
              <li><b>Ethics and Responsibility:</b> Uphold trust, privacy, and ethical practices.</li>
              <li><b>Adaptability and Continuous Learning:</b> Be flexible, learn constantly, embrace change.</li>
            </ul>
          </div>

          <div className="expectations-video md:w-1/2 mt-6 md:mt-0">
            <video 
 src="/marche-healthcare/careers/video.mp4"
              className="expectations-video-file"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <h3 className="current-opening">Current Openings</h3>

      {/* Toggle Buttons */}
      <div className="toggle-buttons">
        <button
          className={selectedCategory === "Full Time" ? "active" : ""}
          onClick={() => setSelectedCategory("Full Time")}
        >
          Full Time
        </button>
        <button
          className={selectedCategory === "Internship" ? "active" : ""}
          onClick={() => setSelectedCategory("Internship")}
        >
          Internship
        </button>
      </div>

      {/* Jobs Section */}
      <div className="careers-section">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <h4>{job.type}</h4>
            <p className="job-desc">{job.desc}</p>
            <button onClick={() => handleApply(job)}>Apply</button> {/* ✅ Navigate on click */}
          </div>
        ))}
      </div>
    </Layouts>
  );
}
