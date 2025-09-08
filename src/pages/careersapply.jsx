import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./css/careersapply.css";
import { Layouts } from "../Layouts/Layouts";

export default function CareersApply() {
  const { state } = useLocation();
  const job = state?.job || null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    message: "",
  });

  const jobTitle = useMemo(() => job?.title || "(General application)", [job]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const templateParams = {
      job_title: jobTitle,
      job_id: job?.id ?? "",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      resume_link: formData.resumeLink,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_oqbjzyl",
        "template_y40v1jw",
        templateParams,
        "X-W0hi00f7BB_nraM"
      );
      alert("✅ Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", resumeLink: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send application. Please check EmailJS config.");
    }
  };

  return (
    <Layouts title={"Careers Apply"}>
      <section className="banner">
        <div className="banner-text">
          <h3>Apply — {jobTitle}</h3>
          <p>Submit your resume</p>
        </div>
      </section>

      <section id="form">
        <div className="splitter">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Skills Matter, No Stories!</h3>
            <p>Showcase your capabilities and measurable results.</p>

            <input type="hidden" id="jobTitle" value={jobTitle} readOnly />

            <div>
              <label htmlFor="name">Name</label>
              <input id="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="email">Email ID</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="phone">Mobile Number</label>
              <input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit number"
                required
              />
            </div>

            <div>
              <label htmlFor="resumeLink">Resume Link (Drive, etc.)</label>
              <input type="url" id="resumeLink" value={formData.resumeLink} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={6} value={formData.message} onChange={handleChange} />
            </div>

            <button type="submit">Submit</button>
          </form>

          <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="group-images">
            <img src="./careersapply/career3.jpg" alt="career apply" />
          </motion.div>
        </div>
      </section>
    </Layouts>
  );
}
