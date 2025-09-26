import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop'; // ← add this

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Layouts = ({ children, title }) => {
  const [upArrow, setUpArrow] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const onScroll = () => {
      setUpArrow(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <ScrollToTop enableHash />  {/* ← this activates the top reset logic */}
      <Header />
      <div className="spacedivider">{children}</div>
      <div
        onClick={scrollToTop}
        className={upArrow ? 'backtotop showuparrow' : 'backtotop'}
      >
        {/* existing SVG */}
        <svg
          viewBox="-3.2 -3.2 38.40 38.40"
          width="53px"
          height="55px"
          fill="#000000"
        >
          <g strokeWidth="0" transform="translate(4.48,4.48), scale(0.72)">
            <rect
              x="-3.2"
              y="-3.2"
              width="38.40"
              height="38.40"
              rx="19.2"
              fill="#560cf5"
            ></rect>
          </g>
          <g>
            <line
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.056"
              x1="16"
              y1="11"
              x2="16"
              y2="23"
            ></line>
            <polyline
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.056"
              points="10.3,16 16,10.3 21.7,16 "
            ></polyline>
            <circle
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.056"
              cx="16"
              cy="16"
              r="12"
            ></circle>
          </g>
        </svg>
      </div>
      <Footer />
    </>
  );
};
