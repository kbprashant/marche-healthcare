import { useEffect, useState } from "react";
import "./css/videopage.css";
import { Layouts } from "../Layouts/Layouts";
import VideoPlayer from "../components/VideoPlayer";
import { useLocation } from "react-router-dom";
import SwiperCarousel from "../components/SwiperCarousel";
import { motion } from "framer-motion";

const VIDEODATA = {
  product: {
    src: "./home/background-video.mp4",
    title: "Product Video",
    description:
      "Learn more about our product through this comprehensive video.",
    buttons: ["Feature1", "Feature2", "Feature3"],
  },
  training: {
    src: "./videos/videobg.mp4",
    title: "Training Video",
    description: "Get trained with our step-by-step training videos.",
    buttons: ["Module1", "Module2", "Module3"],
  },
  surgery: {
    src: "./home/background-video.mp4",
    title: "Surgery Video",
    description: "Watch detailed surgery videos for better understanding.",
    buttons: ["Hello", "Hernia", "Thyroid", "Lung"],
  },
};

const VideoPage = () => {
  const [videoTitle, setVideoTitle] = useState(
    "Magic - Natural Teath Whitening"
  );
  const [videoLink, setVideoLink] = useState("product");
  const [classification, setClassification] = useState(
    VIDEODATA[videoLink].buttons[0]
  );
  const [videoUrl, setVideoUrl] = useState(
    "https://youtu.be/3ivRlCAEr8s?feature=shared "
  );
  const [embedUrl, setEmbedUrl] = useState("");
  useEffect(() => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      alert("Invalid YouTube URL. Please enter a valid link.");
    }
  }, [videoUrl]);

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  function videoTabHandle(selectedButton) {
    setVideoLink(selectedButton);
  }

  // navigaiton
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location, classification]);
  useEffect(() => {
    setClassification(VIDEODATA[videoLink].buttons[0]);
  }, [videoLink]);
  const videoCards = [
    {
      idName: "product",
      name: "Product Video",
    },
    {
      idName: "surgery",
      name: "Surgery Video",
    },
    {
      idName: "training",
      name: "Training Video",
    },
  ];
  const videoCardDetials = {
    product: {
      Feature1: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 5,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 6,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
      ],
      Feature2: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
      ],
      Feature3: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 5,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
      ],
    },
    surgery: {
      Hello: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 5,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 6,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
      ],
      Hernia: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
      ],
      Thyroid: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 5,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
      ],
      Lung: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 5,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 6,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 7,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 8,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
      ],
    },
    training: {
      Module1: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 5,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 6,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
      ],
      Module2: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
      ],
      Module3: [
        {
          id: 1,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 2,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
        {
          id: 3,
          link: "./videos/card-thumbnail.png",
          name: "Video name3",
          play: "https://youtu.be/hmPEH57VuV0?feature=shared",
        },
        {
          id: 4,
          link: "./videos/card-thumbnail.png",
          name: "Video name1",
          play: "https://youtu.be/3ivRlCAEr8s?feature=shared ",
        },
        {
          id: 5,
          link: "./videos/card-thumbnail.png",
          name: "Video name2",
          play: "https://youtu.be/-k3x_1pAs6Q?feature=shared",
        },
      ],
    },
  };

  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMobileView(true);
      } else {
        setMobileView(false);
      }
    };

    // Initial call to set initial state based on window width
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layouts title={"Video-Page"}>
      <section className="vid-banner">
        <video src="./videos/bulb-vedio .mp4" autoPlay muted loop></video>
        <div className="banner-text">
          <h3>Videos</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
      </section>
      <section className="video-gallery">
        <div className="category">
          <div id="productvideo" className="category-container">
            {mobileView ? (
              <select
                className="btn-outline-rounded"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              >
                {videoCards.map((card) => (
                  <option value={card.idName}>{card.name}</option>
                ))}
              </select>
            ) : (
              videoCards.map((card) => (
                <button
                  className={
                    videoLink === card.idName
                      ? "btn-outline-rounded dark"
                      : "btn-outline-rounded "
                  }
                  onClick={() => {
                    videoTabHandle(card.idName);
                  }}
                >
                  {card.name}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="sub-category">
          <h2>{VIDEODATA[videoLink].title}</h2>
          <p>{VIDEODATA[videoLink].description}</p>
          <div className="button-group">
            {mobileView ? (
              <select
                className="btn-outline-rounded"
                value={classification}
                onChange={(e) => {
                  setClassification(e.target.value);
                  const element = document.getElementById(
                    "youtubevideosection"
                  );
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop,
                      behavior: "smooth", // This makes the scrolling smooth
                    });
                  }
                }}
              >
                {VIDEODATA[videoLink].buttons.map((buttonText, index) => (
                  <option value={buttonText}>{buttonText}</option>
                ))}
              </select>
            ) : (
              VIDEODATA[videoLink].buttons.map((buttonText, index) => (
                <motion.button
                  key={buttonText}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.5 }}
                  className={
                    classification === buttonText
                      ? "btn-outline-rounded dark"
                      : "btn-outline-rounded"
                  }
                  onClick={(e) => {
                    setClassification(e.target.textContent);
                    const element = document.getElementById(
                      "youtubevideosection"
                    );
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop,
                        behavior: "smooth", // This makes the scrolling smooth
                      });
                    }
                  }}
                >
                  {buttonText}
                </motion.button>
              ))
            )}
          </div>
        </div>
        <div className="video-section">
          {/* <div className="video-section-header">
            <h2>Video Title</h2>
            <p>
              Gain insights into our products functionality and benefits via our
              video showcase
            </p>
          </div> */}
          <div
            // style={{ height: "100vh", margin: "4em auto" }}
            id="youtubevideosection"
          >
            {embedUrl && (
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div>
            <h1 style={{ textAlign: "left", marginTop: "-50px" }}>
              {videoTitle}
            </h1>
          </div>
          <SwiperCarousel
            setVideoYtLink={setVideoUrl}
            setVideoTitle={setVideoTitle}
            videoCardDetials={videoCardDetials}
            videoLink={videoLink}
            classification={classification}
          />
        </div>
      </section>
    </Layouts>
  );
};

export default VideoPage;
