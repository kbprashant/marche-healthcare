import React from "react";
import { Layouts } from "../Layouts/Layouts"; // keep if you use a common layout
import "./css/terms.css"; // your CSS file

const TermsCondition = () => {
  return (
    <Layouts title="Terms & Conditions"> 
      {/* Optional Banner Section */}
      <section className="terms-banner">
        <div>
          <h1></h1>
        </div>
      </section>

      <div className="terms-container">
        <p>
          Welcome to <strong>Mache Healthcare</strong>. By accessing or using
          our website and services, you agree to comply with and be bound by
          the following Terms & Conditions. Please read them carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using the website, you acknowledge that you have read, understood,
          and agree to be legally bound by these Terms & Conditions.
        </p>

        <h2>2. Use of Services</h2>
        <ul>
          <li>
            You agree to use our healthcare services only for lawful purposes.
          </li>
          <li>
            You must provide accurate and up-to-date information when
            registering or using our services.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account information.
          </li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos,
          images, and software, is the property of <strong>Mache Healthcare</strong> 
          or its licensors and is protected by copyright and other intellectual property laws.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          Mache Healthcare is not responsible for any direct, indirect,
          incidental, or consequential damages arising out of your use of the
          website or services. The information provided on this website is for
          general purposes and does not replace professional medical advice.
        </p>

        <h2>5. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We do not
          endorse or control these websites and are not responsible for their
          content or privacy practices.
        </p>

        <h2>6. Privacy</h2>
        <p>
          By using our services, you consent to the collection and use of
          personal information as described in our <strong>Privacy Policy</strong>.
        </p>

        <h2>7. Prohibited Activities</h2>
        <ul>
          <li>Accessing the website using automated means such as bots or scrapers.</li>
          <li>Attempting to breach security or interfere with website operations.</li>
          <li>Uploading or transmitting harmful, offensive, or illegal content.</li>
        </ul>

        <h2>8. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to our
          services at any time for violation of these Terms & Conditions.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          Mache Healthcare may update these Terms & Conditions from time to
          time. Changes will be posted on this page with the "Last Updated"
          date. Continued use of the website after changes constitutes your
          acceptance of the new terms.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms & Conditions are governed by and construed in accordance
          with the laws of India. Any disputes shall be subject to the
          exclusive jurisdiction of the courts in India.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have any questions about these Terms & Conditions, please
          contact us at:
        </p>
        <p>
          <strong>Mache Healthcare</strong> <br />
          Email: info@machehealthcare.com <br />
          
        </p>
      </div>
    </Layouts>
  );
};

export default TermsCondition;
