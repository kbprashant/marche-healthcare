import React, { useRef } from 'react'
import './css/accordionitem.css'


const AccordionItem = ({ handleToggle, active, faq }) => {
    const contentEl = useRef();
    const { header, id, text } = faq;

    return (
        <div className={`rc-accordion-card `}>
            <div className={`rc-accordion-header ${active === id ? 'rc-accordion-active' : 'rc-accordion-border'} `}>
                <div className={`rc-accordion-toggle ${active === id ? 'active' : ''}`} onClick={() => handleToggle(id)}>
                    <h5 className="rc-accordion-title">{header}</h5>
                    <img src={active === id ? "./subtract.png":"./plus.png "}width="30"  alt="arrow" /> 
                </div>
            </div>
            <div ref={contentEl} className={`rc-collapse  ${active === id ? 'rc-accordion-active show' : ''} `} style={
                active === id
                    ? { height: contentEl.current.scrollHeight }
                    : { height: "0px" }
            }>
                <div className={`rc-accordion-body `}>
                    <p className='mb-0'>{text}</p>
                </div>
            </div>
        </div>
    )
}

export default AccordionItem