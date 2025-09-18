import React, { useRef } from 'react'
import './css/accordionitem.css'


const AccordionItem = ({ handleToggle, active, faq }) => {
    const contentEl = useRef();
    const { header, id, text, img, specs, cta } = faq;

    return (
        <div className={`rc-accordion-card `}>
            <div className={`rc-accordion-header ${active === id ? 'rc-accordion-active' : 'rc-accordion-border'} `}>
                <div className={`rc-accordion-toggle ${active === id ? 'active' : ''}`} onClick={() => handleToggle(id)}>
                    <h5 className="rc-accordion-title">{header}</h5>
                    <img src={active === id ? "./subtract.png" : "./plus.png"} width="30" alt="toggle" />
                </div>
            </div>
            <div
              ref={contentEl}
              className={`rc-collapse  ${active === id ? 'rc-accordion-active show' : ''} `}
              style={
                active === id
                    ? { height: contentEl.current?.scrollHeight }
                    : { height: "0px" }
              }
            >
                <div className={`rc-accordion-body`}>
                    {img ? (
                        <div className="rc-accordion-body-row">
                            <img src={img} alt={header} className="rc-accordion-img" />
                            <div className="rc-accordion-text">
                                <p className='mb-0'>{text}</p>
                            </div>
                        </div>
                    ) : (
                        <p className='mb-0'>{text}</p>
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

                    {cta && (
                        <div className="rc-accordion-cta">
                            {cta}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AccordionItem