import React from "react";
import { Layouts } from "../Layouts/Layouts";
import "./css/policy.css";

const PrivacyPolicy = () => {
  return (
    <Layouts>
      <section className="privacy-banner">
        <div>
          <h1></h1>
          <h1></h1>
          <h1></h1>
        </div>
      </section>

      <div className="privacy-container">
        <p>
          At <strong>Marche Healthcare</strong>, your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          personal and health information when you use our website, apps, and
          services.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Personal information such as name, email, phone number, and address.</li>
          <li>Health-related information you provide for consultations, treatments, or appointments.</li>
          <li>Payment information when you use our billing or insurance services.</li>
          <li>Technical data like IP address, browser type, device information, and cookies.</li>
          <li>Communication logs such as emails or messages sent to our support team.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information to:</p>
        <ul>
          <li>Provide, personalize, and improve our healthcare services.</li>
          <li>Manage appointments, reminders, and patient follow-ups.</li>
          <li>Process payments securely.</li>
          <li>Communicate important updates, promotions, or changes in policies.</li>
          <li>Ensure security and detect fraudulent activities.</li>
          <li>Comply with legal, regulatory, and ethical obligations.</li>
        </ul>

        <h2>3. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share data only with trusted partners such as:
        </p>
        <ul>
          <li>Healthcare providers and hospitals for treatment purposes.</li>
          <li>Payment processors to complete transactions.</li>
          <li>Legal or regulatory authorities if required by law.</li>
        </ul>
        <p>
          All partners are bound by strict confidentiality and data protection obligations.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement encryption, firewalls, secure servers, and access controls
          to protect your information. However, please note that no system is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2>5. Your Rights</h2>
        <ul>
          <li>Access and request a copy of your personal or health data.</li>
          <li>Request corrections to any inaccurate information.</li>
          <li>Request deletion of your data, subject to legal or medical record-keeping requirements.</li>
          <li>Opt out of marketing or non-essential communications.</li>
          <li>Withdraw consent for processing your data where applicable.</li>
        </ul>

        <h2>6. Cookies and Tracking</h2>
        <p>
          Our website uses cookies, analytics, and other tracking technologies
          to enhance user experience, analyze trends, and improve services.
          You can disable cookies through your browser settings, but some features may not function correctly.
        </p>

        <h2>7. Children’s Privacy</h2>
        <p>
          Our services are not directed toward individuals under 18 years of age.
          We do not knowingly collect personal information from children.
          If you believe a child has provided us with personal information, please contact us immediately.
        </p>

        <h2>8. Third-Party Services</h2>
        <p>
          We may use third-party services for analytics, marketing, or cloud storage.
          These services may collect data according to their own privacy policies.
          We recommend reviewing third-party privacy policies before using linked services.
        </p>

        <h2>9. Retention of Data</h2>
        <p>
          We retain your personal and health information only as long as necessary for operational, legal, or regulatory purposes. After this period, data is securely deleted or anonymized.
        </p>

        <h2>10. International Transfers</h2>
        <p>
          If you access our services from outside India, your data may be transferred
          to and stored in countries with different data protection laws. We take
          necessary steps to ensure your data remains protected in accordance
          with applicable regulations.
        </p>

        <h2>11. User Consent</h2>
        <p>
          By using our website and services, you consent to the collection and use
          of your information as described in this Privacy Policy.
          You can manage your consent or withdraw it at any time by contacting us.
        </p>

        <h2>12. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes in our practices or legal requirements. The "Last Updated" date
          will be displayed at the top of this page. We encourage you to review
          the policy periodically.
        </p>

        <h2>13. Contact Us</h2>
        <p>
          For questions, concerns, or requests regarding this Privacy Policy, please contact:
        </p>
        <p>
          <strong>Marche Healthcare</strong> <br />
          Email: info@marchehealthcare.com <br />
                    
        </p>
      </div>
    </Layouts>
  );
};

export default PrivacyPolicy;
