import { useState } from "react";
import { motion } from "framer-motion";
import "./css/contactpage.css";
import { Layouts } from "../Layouts/Layouts";
import ContactCards from "../components/ContactCards";
import emailImg from "../assets/contact/mail.png";
import internetImg from "../assets/contact/circle.png";
import locationImg from "../assets/contact/pin.png";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const cardDetails = [
    {
      img: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              clip-rule="evenodd"
              d="m7.8 4.25h-.0321c-.81284-.00001-1.46846-.00001-1.99937.04336-.54663.04467-1.02678.13903-1.47099.36537-.70561.35952-1.27929.9332-1.63881 1.63881-.22634.44421-.3207.92436-.36537 1.47099-.04337.53091-.04337 1.18652-.04336 1.99935v.00002.0321 4.4.0321c-.00001.8129-.00001 1.4685.04336 1.9994.04467.5466.13903 1.0267.36537 1.471.35952.7056.9332 1.2792 1.63881 1.6388.44421.2263.92436.3207 1.47099.3653.53091.0434 1.18652.0434 1.99935.0434h.03212 8.4.0321c.8129 0 1.4685 0 1.9994-.0434.5466-.0446 1.0267-.139 1.471-.3653.7056-.3596 1.2792-.9332 1.6388-1.6388.2263-.4443.3207-.9244.3653-1.471.0434-.5309.0434-1.1865.0434-1.9994v-.0321-4.4-.03212c0-.81283 0-1.46844-.0434-1.99935-.0446-.54663-.139-1.02678-.3653-1.47099-.3596-.70561-.9332-1.27929-1.6388-1.63881-.4443-.22634-.9244-.3207-1.471-.36537-.5309-.04337-1.1866-.04337-1.9994-.04336h-.0321zm-2.82148 1.74524c.19752-.10064.45829-.16977.91216-.20686.46263-.0378 1.05687-.03838 1.90932-.03838h8.4c.8525 0 1.4467.00058 1.9093.03838.4539.03709.7147.10622.9122.20686.2021.10296.3861.2352.5467.39135-.0346.02442-.0676.05211-.0985.08308l-4.6059 4.60593c-.6028.6027-1.0234 1.0225-1.3773 1.3229-.3471.2947-.5804.4302-.7912.4987-.4519.1469-.9387.1469-1.3906 0-.2108-.0685-.4441-.204-.7912-.4987-.3539-.3004-.77451-.7202-1.37728-1.3229l-4.60589-4.60593c-.03097-.03097-.06397-.05866-.09858-.08308.16065-.15615.34469-.28839.54677-.39135zm-1.18688 1.85705c-.00112.01264-.0022.02544-.00326.03839-.0378.46263-.03838 1.05687-.03838 1.90932v4.4c0 .8525.00058 1.4467.03838 1.9093.03709.4539.10622.7147.20686.9122.21571.4233.55992.7675.98328.9833.19752.1006.45829.1697.91216.2068.46263.0378 1.05687.0384 1.90932.0384h8.4c.8525 0 1.4467-.0006 1.9093-.0384.4539-.0371.7147-.1062.9122-.2068.4233-.2158.7675-.56.9833-.9833.1006-.1975.1697-.4583.2068-.9122.0378-.4626.0384-1.0568.0384-1.9093v-4.4c0-.85245-.0006-1.44669-.0384-1.90932-.001-.01295-.0021-.02574-.0032-.03838l-4.284 4.2839-.0227.0227-.0001.0001c-.5747.5747-1.0382 1.0383-1.4443 1.383-.4181.355-.8243.6278-1.2985.7818-.7531.2447-1.5645.2447-2.3176 0-.4742-.154-.8804-.4268-1.29851-.7818-.40608-.3447-.86966-.8083-1.4444-1.3831h-.00003l-.0227-.0227z"
              fill="#ffffff"
              fill-rule="evenodd"
            ></path>
          </g>
        </svg>
      ),
      header: "Email",
      content: "Hi, our team is here to assist you, just mail us!",
      link: "info@marchehealthcare.org",
    },
    {
      img: (
        <svg
          fill="#ffffff"
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 372 372"
          xml:space="preserve"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M186,0C83.439,0,0,83.439,0,186s83.439,186,186,186s186-83.44,186-186S288.56,0,186,0z M324.306,274.045 c-18.671-8.915-42.186-15.714-68.646-20.026c2.858-17.979,4.567-37.197,5.03-57.019h88.933 C347.745,225.213,338.709,251.499,324.306,274.045z M186,345c-11.782,0-24.803-15.947-34.831-42.658 c-3.385-9.016-6.322-18.924-8.791-29.524c14.042-1.436,28.701-2.189,43.622-2.189s29.58,0.753,43.622,2.189 c-2.468,10.6-5.406,20.508-8.79,29.524C210.803,329.053,197.782,345,186,345z M186,248.628c-16.479,0-32.535,0.847-47.861,2.471 c-2.725-16.977-4.364-35.214-4.824-54.1h105.371c-0.46,18.886-2.099,37.123-4.824,54.1C218.535,249.476,202.479,248.628,186,248.628 z M22.377,197h88.933c0.463,19.821,2.172,39.04,5.03,57.018c-26.461,4.312-49.976,11.111-68.646,20.026 C33.291,251.499,24.255,225.213,22.377,197z M47.694,97.956c18.67,8.915,42.186,15.714,68.646,20.026 c-2.858,17.978-4.567,37.197-5.03,57.018H22.377C24.255,146.787,33.291,120.502,47.694,97.956z M186,27 c11.782,0,24.803,15.947,34.831,42.658c3.385,9.016,6.322,18.924,8.79,29.524c-14.042,1.436-28.701,2.189-43.622,2.189 s-29.58-0.753-43.622-2.189c2.469-10.6,5.406-20.508,8.791-29.524C161.197,42.947,174.218,27,186,27z M186,123.372 c16.479,0,32.535-0.847,47.861-2.471c2.725,16.977,4.364,35.214,4.824,54.1H133.314c0.46-18.886,2.1-37.123,4.824-54.1 C153.465,122.524,169.521,123.372,186,123.372z M260.69,175c-0.463-19.821-2.172-39.04-5.03-57.019 c26.461-4.312,49.976-11.111,68.646-20.026c14.403,22.546,23.439,48.832,25.317,77.045H260.69z M310.936,79.888 c-16.221,7.148-36.626,12.734-59.414,16.418c-2.783-12.355-6.16-23.9-10.095-34.38c-5.509-14.674-11.963-26.705-19.127-35.87 C257.448,34.029,288.34,53.324,310.936,79.888z M149.7,26.056c-7.164,9.165-13.618,21.196-19.127,35.87 c-3.935,10.48-7.312,22.025-10.095,34.38c-22.788-3.683-43.194-9.27-59.414-16.418C83.66,53.324,114.552,34.029,149.7,26.056z M61.063,292.112c16.221-7.148,36.626-12.735,59.414-16.418c2.783,12.354,6.16,23.9,10.095,34.38 c5.509,14.674,11.963,26.705,19.127,35.87C114.552,337.971,83.66,318.676,61.063,292.112z M222.3,345.944 c7.164-9.165,13.618-21.196,19.127-35.87c3.935-10.48,7.312-22.025,10.095-34.38c22.788,3.684,43.193,9.27,59.414,16.418 C288.34,318.676,257.448,337.971,222.3,345.944z"></path>{" "}
          </g>
        </svg>
      ),
      header: "Join our Community",
      content:
        "Stay informed with our latest news and events. Follow us to be part of the conversation",
      link: [
        {
          lin: "https://www.linkedin.com/company/marche-healthcare/",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              // width="42"
              // height="35"
              className="logo-inside-logo-div"
              viewBox="0 0 24 24"
              // fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.25h-3v-5.5c0-1.38-.56-2-1.75-2-1.14 0-1.75.79-1.75 2v5.5h-3v-11h3v1.62c.41-.79 1.27-1.62 2.75-1.62 1.94 0 3.5 1.12 3.5 4.01v6.99z" />
            </motion.svg>
          ),
        },
        {
          lin: "https://x.com/info_march49738",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              // width="42"
              // height="35"
              className="logo-inside-logo-div"
              viewBox="0 0 24 24"
              // fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4.56c-.89.39-1.84.65-2.84.77a4.92 4.92 0 0 0 2.17-2.71c-.94.56-1.97.96-3.08 1.18a4.89 4.89 0 0 0-8.32 4.45c-4.07-.2-7.68-2.15-10.1-5.1a4.87 4.87 0 0 0-.66 2.46c0 1.7.87 3.2 2.19 4.08-.81-.03-1.57-.25-2.23-.62v.06c0 2.38 1.69 4.36 3.93 4.81-.41.11-.84.17-1.28.17-.31 0-.61-.03-.91-.08.61 1.91 2.39 3.3 4.5 3.34a9.86 9.86 0 0 1-6.1 2.1c-.4 0-.79-.02-1.17-.07a13.94 13.94 0 0 0 7.56 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.01-.63a9.9 9.9 0 0 0 2.45-2.53z"
                // fill="currentColor"
              />
            </motion.svg>
          ),
        },
        {
          lin: "https://www.instagram.com/invites/contact/?igsh=jcoo1221g882&utm_content=uh81aej",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              // width="42"
              // height="35"
              className="logo-inside-logo-div"
              viewBox="0 0 24 24"
              // fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.94.24 2.39.41.59.23 1.01.51 1.46.96.45.45.73.87.96 1.46.18.45.36 1.22.41 2.39.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.94-.41 2.39-.23.59-.51 1.01-.96 1.46-.45.45-.87.73-1.46.96-.45.18-1.22.36-2.39.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.94-.24-2.39-.41-.59-.23-1.01-.51-1.46-.96-.45-.45-.73-.87-.96-1.46-.18-.45-.36-1.22-.41-2.39-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.94.41-2.39.23-.59.51-1.01.96-1.46.45-.45.87-.73 1.46-.96.45-.18 1.22-.36 2.39-.41 1.27-.06 1.65-.07 4.85-.07zm0-2.16c-3.29 0-3.7.01-4.99.07-1.32.06-2.23.26-3.01.57-.87.34-1.61.8-2.36 1.55-.75.75-1.21 1.49-1.55 2.36-.31.78-.51 1.69-.57 3.01-.06 1.29-.07 1.7-.07 4.99s.01 3.7.07 4.99c.06 1.32.26 2.23.57 3.01.34.87.8 1.61 1.55 2.36.75.75 1.49 1.21 2.36 1.55.78.31 1.69.51 3.01.57 1.29.06 1.7.07 4.99.07s3.7-.01 4.99-.07c1.32-.06 2.23-.26 3.01-.57.87-.34 1.61-.8 2.36-1.55.75-.75 1.21-1.49 1.55-2.36.31-.78.51-1.69.57-3.01.06-1.29.07-1.7.07-4.99s-.01-3.7-.07-4.99c-.06-1.32-.26-2.23-.57-3.01-.34-.87-.8-1.61-1.55-2.36-.75-.75-1.49-1.21-2.36-1.55-.78-.31-1.69-.51-3.01-.57-1.29-.06-1.7-.07-4.99-.07zM12 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.32c-2.29 0-4.16-1.87-4.16-4.16s1.87-4.16 4.16-4.16 4.16 1.87 4.16 4.16-1.87 4.16-4.16 4.16zm6.48-10.64c-.77 0-1.4-.63-1.4-1.4s.63-1.4 1.4-1.4 1.4.63 1.4 1.4-.63 1.4-1.4 1.4z"
                // fill="currentColor"
              />
            </motion.svg>
          ),
        },
        {
          lin: "https://youtube.com/@marchehealthcare?si=Nktj1VOLNtZBrdmS",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              className="logo-inside-logo-div"
              // width="42"
              // height="42"
              viewBox="0 0 24 24"
              // fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6 3.2c-.8-.3-2.8-.3-5.6-.3s-4.8 0-5.6.3c-.8.3-1.4.7-2 1.3-.5.5-1 1.2-1.3 2-.3.8-.3 2.8-.3 5.6s0 4.8.3 5.6c.3.8.7 1.4 1.3 2 .5.5 1.2 1 2 1.3.8.3 2.8.3 5.6.3s4.8 0 5.6-.3c.8-.3 1.4-.7 2-1.3.5-.5 1-1.2 1.3-2 .3-.8.3-2.8.3-5.6s0-4.8-.3-5.6c-.3-.8-.7-1.4-1.3-2-.5-.5-1.2-1-2-1.3zm-7.6 9.9v-5.4l4.6 2.7-4.6 2.7z"
                // fill="currentColor"
              />
            </motion.svg>
          ),
        },
      ],
    },
    {
      img: (
        <svg
          fill="#ffffff"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"></path>{" "}
          </g>
        </svg>
      ),
      header: "Locate us",
      content: "Find our office and location to reach us",
      link: {
        url: "https://maps.app.goo.gl/sS6HjUAPMz4iFf5t5",
        text: "13, Near Auroville, Pondicherry-Tindivanam highways, Thiruchitrambalam, Vanur, Tamilnadu-605111",
      },
    },
  ];
  return (
    <Layouts title={"Contact-Page"}>
      <section className="banner">
        <div className="banner-text">
          <h3>Contact us</h3>
          <p>
            Kindly submit you details and share your message to us, thankyou
          </p>
        </div>
      </section>
      <motion.section
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        id="cards"
        className="cards-in-contactpage"
      >
        {cardDetails.map((card) => (
          <ContactCards key={card.header} {...card} />
        ))}
      </motion.section>
      <section id="form">
        <div className="splitter">
          <form className="contact-form">
            <h3>Hello! Feel free to get in touch with us</h3>

            <p>
              Discover how we can support your needs by reaching out to us we're
              here to provide assistance and guidance.
            </p>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="purpose">Purpose</label>
              <select
                id="purpose"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
              >
                <option value="" disabled>
                  Select a purpose
                </option>
                <option value="Request-demo">Request a Demo</option>
                <option value="Purchase">Purchase</option>
                <option value="Career">Career Oportunity</option>
                <option value="Find-distributor">Find a Distributor</option>
                <option value="meeting">Meeting</option>
                {/* <option value="IFU-download">IFU Download</option> */}
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="message">
                Detailed message about selected purpose: {purpose}
              </label>
              <textarea
                type="text"
                id="message"
                rows={10}
                placeholder="Type your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>

            <button type="button">Submit</button>
          </form>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="group-images"
          >
            <img src="./contact/contact-group-img.jpeg" alt="contact images" />
          </motion.div>
        </div>
      </section>
    </Layouts>
  );
};

export default ContactPage;
