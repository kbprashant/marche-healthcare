const ContactCards = ({ img, header, content, link }) => {
  return (
    <div className="contact-card">
      <div style={{backgroundColor:"var(--primary)",padding:"5px 5px 0",borderRadius:"var(--border-radius-primary)"}} className="logo-in-cards">{img}</div>
      
      <h3>{header}</h3>
      <div className="link-holder">
      <p>{content}</p>
        {Array.isArray(link) ? (
          <div style={{display:"flex",justifyContent:"center",gap:"15px"}}>
            {
          link.map((item, index) => (
            <a className="logo-in-contact"
              style={{
                margin: "0 .2em",
                width: "24px",
                height: "24px",
                
              }}
              href={item.lin}
              target="_blank"
              key={index}

            >
              {/* <img width={"30px"} src={item.img} alt={item.lin} /> */}
              {item.img}
            </a>
          ))
        }</div>
        ) : typeof link === "object" ? (
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        ) : (
          <a href={link} target="_blank">
            {link}
          </a>
        )}
      </div>
    </div>
  );
};

export default ContactCards;
