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
    resumeFile: null,
    message: "",
  });

  const jobTitle = useMemo(() => job?.title || "(General application)", [job]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("❌ Only PDF files are allowed!");
        e.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("❌ File size must be less than 5 MB!");
        e.target.value = "";
        return;
      }
      setFormData({ ...formData, resumeFile: file });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Gmail check
  if (!formData.email.endsWith("@gmail.com")) {
    alert("❌ Only Gmail addresses are allowed!");
    return;
  }

  if (!formData.resumeFile) {
    alert("❌ Please upload your resume (PDF only, max 5 MB).");
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("phone", formData.phone);
  formDataToSend.append("message", formData.message);
  formDataToSend.append("resume", formData.resumeFile); // file upload

  try {
    const res = await fetch("/api/apply", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        resumeFile: null,
        message: "",
      });
    } else {
      alert("❌ " + (data.error || "Failed to submit"));
    }
  } catch (err) {
    console.error(err);
    alert("❌ Failed to connect to server");
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
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email (Gmail only)</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
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
              <label htmlFor="resume">Upload Resume (PDF only, max 5MB)</label>
              <input
                type="file"
                id="resume"
                accept="application/pdf"
                onChange={(e) =>
                  setFormData({ ...formData, resumeFile: e.target.files[0] })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Submit</button>
          </form>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="group-images"
          >
            <img src="./careersapply/career3.jpg" alt="career apply" />
          </motion.div>
        </div>
      </section>
    </Layouts>
  );
}
