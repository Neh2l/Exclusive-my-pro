import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./Arrow.css";

const Arrow = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    const scrollDuration = 500;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className="scroll-to-top"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default Arrow;
