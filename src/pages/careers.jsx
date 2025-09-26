import "./css/careers.css";
import React, { useEffect, useMemo, useState } from "react";
import { Layouts } from "../Layouts/Layouts";
import SEOJsonLd from "../components/SEOJsonLd";
import { useNavigate } from "react-router-dom";
import AccordionItem from "../components/AccordionItem";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

// simple fallback if API is empty
const SAMPLE_JOBS = [
  {
    id: "sample-1",
    title: "Software Engineer",
    category: "fulltime",
    description:
      "Build and maintain web apps with scalable backend services, integrate APIs, and collaborate with cross-functional teams.",
    location: "Remote",
    experience: "1–3 yrs",
    salary: "₹3–5 LPA",
    skills: "React, Node.js, SQL",
  },
];

function uiToApiCategory(ui = "Full Time") {
  return String(ui).toLowerCase().includes("intern") ? "internship" : "fulltime";
}

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState("Full Time");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [activeJob, setActiveJob] = useState(null);
  const navigate = useNavigate();

  // fetch published jobs from public API
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const category = uiToApiCategory(selectedCategory);
        const url = new URL(`${API_BASE}/public/careers`, window.location.origin);
        url.searchParams.set("category", category);
        url.searchParams.set("limit", "24");
        const res = await fetch(url.toString(), { cache: "no-store" });
        const data = await res.json();
        if (!data?.ok) throw new Error(data?.error || "FAILED");
        if (alive) setRows(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        if (alive) {
          setErr(e.message || "Failed to load careers");
          setRows([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [selectedCategory]);

  const jobs = useMemo(
    () => (rows.length ? rows : SAMPLE_JOBS),
    [rows]
  );

  const handleApply = (job) => {
    // if backend gives an external application URL, go there
    if (job.apply_url) {
      window.open(job.apply_url, "_blank", "noopener,noreferrer");
    } else {
      // otherwise open our internal apply page with job in state
      navigate("/careersapply", { state: { job } });
    }
  };

  const handleToggleJob = (id) => {
    if (activeJob === id) setActiveJob(null);
    else setActiveJob(id);
  };

  return (
    <Layouts title="Careers - Marche Healthcare" description="Join Marche Healthcare — build innovations that make advanced healthcare accessible." canonical="https://marchehealthcare.org/careers">
      <SEOJsonLd webpage={{ name: 'Careers', description: 'Open roles and internships at Marche Healthcare.', url: 'https://marchehealthcare.org/careers' }} breadcrumb />
      {/* Banner */}
      <div className="careers-banner">
        <div className="banner-text">
          <h3>Careers at Marche Healthcare</h3>
          <p>Join our mission and grow with us</p>
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
              src="/careers/video.mp4"
              className="expectations-video-file"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <h3 className="current-opening">Current Openings</h3>

      {/* Toggle */}
      <div className="toggle-buttons">
        {["Full Time", "Internship"].map((label) => (
          <button
            key={label}
            className={selectedCategory === label ? "active" : ""}
            onClick={() => setSelectedCategory(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Jobs */}
      <div className="careers-section">
        {loading && <div className="job-card">Loading…</div>}
        {!loading && err && <div className="job-card" style={{ color: "crimson" }}>{err}</div>}

        {!loading &&
          jobs.map((job) => {
            const faqObj = {
              header: job.title,
              id: job.id,
              text: job.description || "",
            };

            return (
              <div
                key={job.id}
                onMouseEnter={() => setActiveJob(job.id)}
                onMouseLeave={() => setActiveJob(null)}
              >
                <AccordionItem
                  active={activeJob}
                  handleToggle={handleToggleJob}
                  faq={{
                    ...faqObj,
                    cta: (
                      <div className="job-apply-cta">
                        <button className="btn-apply" onClick={() => handleApply(job)}>
                          Apply
                        </button>
                      </div>
                    ),
                  }}
                />
              </div>
            );
          })}
      </div>
    </Layouts>
  );
}
