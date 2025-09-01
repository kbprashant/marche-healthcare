import React from "react";
import "./css/faqaccordion.css";

const FaqAccordion = ({ index, faq, setAcc, currAcc }) => {
  const { id, title, img } = faq;

  const isShow = index === currAcc;

  function toggleAccorion() {
    setAcc(isShow ? null : index);
  }

  return (
    <div className={`faq-item ${isShow ? "show" : "notshow"}`}>
      <div
        className={`faq-item-header ${isShow ? "" : "faq-item-border-bottom"}`}
        onClick={toggleAccorion}
      >
        <h2>{title}</h2>{" "}
        <img src={isShow ? "./uparrow.png" : "./downarrow.png"} alt="x" />
      </div>
      <div
        className={`faq-item-body ${isShow ? "faq-item-border-bottom" : ""}`}
      >
        <div className="faq-item-body-content">
          <img src={img} alt="faq" />
          <img src={img} alt="faq" />
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
