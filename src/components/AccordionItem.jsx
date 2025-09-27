import React, { useRef } from 'react';
import './css/accordionitem.css';

function sanitizeHtml(html = "") {
  try {
    // very small sanitizer: remove script/style, event handlers, and javascript: urls
    let s = String(html);
    s = s.replace(/<\/(?:script|style)>/gi, ""); // close tags safe
    s = s.replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "");
    s = s.replace(/ on[a-z]+\s*=\s*"[^"]*"/gi, "");
    s = s.replace(/ on[a-z]+\s*=\s*'[^']*'/gi, "");
    s = s.replace(/ on[a-z]+\s*=\s*[^\s>]+/gi, "");
    s = s.replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"');
    s = s.replace(/href\s*=\s*'javascript:[^']*'/gi, "href='#'");
    s = s.replace(/src\s*=\s*"javascript:[^"]*"/gi, '');
    s = s.replace(/src\s*=\s*'javascript:[^']*'/gi, '');
    return s;
  } catch {
    return String(html || "");
  }
}

const AccordionItem = ({ handleToggle, active, faq, disableClick = false }) => {
  const contentEl = useRef();
  const { header, id, text, img, specs, cta, html } = faq;

  const isOpen = active === id;

  const onToggle = () => {
    if (disableClick || typeof handleToggle !== 'function') return;
    handleToggle(id);
  };

  return (
    <div className="rc-accordion-card">
      <div className={`rc-accordion-header ${isOpen ? 'rc-accordion-active' : 'rc-accordion-border'}`}>
        <div
          className={`rc-accordion-toggle ${isOpen ? 'active' : ''}`}
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
          aria-expanded={isOpen}
          aria-controls={`product-acc-${id}`}
        >
          <h5 className="rc-accordion-title">{header}</h5>
          <img
            src={isOpen ? "./subtract.png" : "./plus.png"}
            width="30"
            alt={isOpen ? "collapse" : "expand"}
          />
        </div>
      </div>

      <div
        id={`product-acc-${id}`}
        ref={contentEl}
        className={`rc-collapse ${isOpen ? 'rc-accordion-active show' : ''}`}
        style={
          isOpen
            ? { height: contentEl.current?.scrollHeight }
            : { height: '0px' }
        }
      >
        <div className="rc-accordion-body">
          {img ? (
            <div className="rc-accordion-body-row">
              <img src={img} alt={header} className="rc-accordion-img" />
              <div className="rc-accordion-text">
                {html ? (
                  <div className="mb-0" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />
                ) : (
                  <p className="mb-0">{text}</p>
                )}
              </div>
            </div>
          ) : (
            html ? (
              <div className="mb-0" dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />
            ) : (
              <p className="mb-0">{text}</p>
            )
          )}

          {Array.isArray(specs) && specs.length > 0 && (
            <div className="rc-accordion-specs">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th>ITEM CODE</th>
                    <th>PRODUCT DESCRIPTION</th>
                    <th>JAW LENGTH</th>
                    <th>SHAFT DIAMETER</th>
                    <th>SHAFT LENGTH</th>
                    <th>LOCK</th>
                    <th>ELECTRODE</th>
                    <th>UNITS/BOX</th>
                    <th>USES</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.itemCode}</td>
                      <td>{row.productDescription}</td>
                      <td>{row.jawLength}</td>
                      <td>{row.shaftDiameter}</td>
                      <td>{row.shaftLength}</td>
                      <td>{row.lock}</td>
                      <td>{row.electrode}</td>
                      <td>{row.unitsBox}</td>
                      <td>{row.uses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {cta && <div className="rc-accordion-cta">{cta}</div>}
        </div>
      </div>
    </div>
  );
};


export default AccordionItem;