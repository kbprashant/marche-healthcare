import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop({ enableHash = true }) {
  const location = useLocation();

  useEffect(() => {
    // Always disable native restoration for consistent behavior
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // If there is a hash and we allow hash scrolling, try to scroll to it
    if (enableHash && location.hash) {
      const id = location.hash.substring(1);
      // Small timeout to allow content to mount (e.g., images, async stuff)
      requestAnimationFrame(() => {
        const el = document.getElementById(id) || document.querySelector(`[data-anchor='${id}']`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        // Fallback: still go to top if id not found
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    } else {
      // No hash → go to very top
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      // Extra safety for some browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location.pathname, location.hash, enableHash]);

  return null;
}