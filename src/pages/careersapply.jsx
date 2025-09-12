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

    const formDataObj = new FormData();
    formDataObj.append("job_title", jobTitle);
    formDataObj.append("job_id", job?.id ?? "");
    formDataObj.append("from_name", formData.name);
    formDataObj.append("from_email", formData.email);
    formDataObj.append("phone", formData.phone);
    formDataObj.append("resume", formData.resumeFile);
    formDataObj.append("message", formData.message);

    try {
      // ⚠️ EmailJS doesn’t support file upload directly in the free plan.
      // You would need to either:
      // (1) Upload the file to your backend / storage (S3, Firebase, etc.) and send the link via EmailJS
      // OR
      // (2) Switch to a backend API to handle file + email.

      await emailjs.send(
        "service_oqbjzyl",
        "template_y40v1jw",
        {
          job_title: jobTitle,
          job_id: job?.id ?? "",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          // Instead of file, send a placeholder note:
          resume_info: "Resume file uploaded (Check backend storage)", 
        },
        "X-W0hi00f7BB_nraM"
      );

      alert("✅ Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        resumeFile: null,
        message: "",
      });
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
              <label htmlFor="resumeFile">Upload Resume (PDF, max 5 MB)</label>
              <input
                type="file"
                id="resumeFile"
                accept="application/pdf"
                onChange={handleFileChange}
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
