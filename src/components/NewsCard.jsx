import { motion } from "framer-motion";
import "./css/carduserprofile.css";

const NewsCard = ({
  isActive,
  img,
  names,
  title,
  content,
  date,
  onSelected,
  profile
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      // transition={{ delay: 0.3 }}
      onClick={onSelected}
      className={
        isActive ? ` user-card-active` : ``
      }
    >
      <div className="blog-card">
        <img src={img} alt="Blog" className="blog-image-3" />
        <div className="blog-content">
          <h3 className="blog-title">{title}</h3>
          <p className="blog-text">{content}</p>
        </div>
        <div className="blog-footer">
          <div className="author-container">
            <div className="img-container">
              <img src={profile} alt="author" className="author" />
            </div>
            <div className="author-content">
              <p className="author-name">{names}</p>
              <div className="author-time">
                <p className="blog-date">{date}</p>
              </div>
            </div>
          </div>
          <motion.svg
            whileHover={{ scale: 1.2 }}
            width="42"
            height="35"
            viewBox="0 0 24 24"
            fill="black"
            className="card-social"
            xmlns="http://www.w3.org/2000/svg"
          >
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
