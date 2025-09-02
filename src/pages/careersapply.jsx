import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import "./css/careersapply.css";
import { Layouts } from "../Layouts/Layouts";

const CareersApply = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      resume_link: formData.resumeLink,
      message: formData.message,
    };

    emailjs
      .send(
        "service_oqbjzyl", // ✅ Your Service ID
        "template_y40v1jw", // ✅ Your Template ID
        templateParams,
        "X-W0hi00f7BB_nraM" // ✅ Your Public Key
      )
      .then(
        (response) => {
          alert("✅ Application submitted successfully!");
          console.log("SUCCESS!", response.status, response.text);

          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            resumeLink: "",
            message: "",
          });
        },
        (error) => {
          console.error("FAILED...", error);
          alert("❌ Failed to send application. Please check EmailJS config.");
        }
      );
  };

  return (
    <Layouts title={"Careers Apply"}>
      {/* Banner */}
      <section className="banner">
        <div className="banner-text">
          <h3>Careers</h3>
          <p>Submit Your Resume</p>
        </div>
      </section>

      {/* Form Section */}
      <section id="form">
        <div className="splitter">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Skills Matter, No Stories!</h3>
            <p>
              Showcase your capabilities, not just your chronicles. Get evaluated
              on pure expertise and measurable results.
            </p>

            {/* Name */}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone">Mobile Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                placeholder="Enter 10-digit number"
                required
              />
            </div>

            {/* Resume Link */}
            <div>
              <label htmlFor="resumeLink">Resume Link (Google Drive, etc.)</label>
              <input
                type="url"
                id="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="Paste resume link"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={6}
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
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
};

export default CareersApply;
