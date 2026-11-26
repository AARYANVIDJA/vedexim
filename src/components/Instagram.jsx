import { useEffect, useState } from "react";
import "./Instagram.css";

function Instagram() {
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const x = window.innerWidth - 45;
      const y = window.innerHeight - 115;

      const elements = document.elementsFromPoint(x, y);

      let backgroundColor = "rgb(255, 255, 255)";

      for (const element of elements) {
        if (element.closest(".instagram-float-button")) continue;

        let current = element;

        while (current && current !== document.documentElement) {
          const color = window.getComputedStyle(current).backgroundColor;

          if (color && color !== "transparent" &&
              !color.includes("rgba(0, 0, 0, 0)")) {
            backgroundColor = color;
            break;
          }

          current = current.parentElement;
        }

        if (backgroundColor !== "rgb(255, 255, 255)") break;
      }

      const rgb = backgroundColor.match(/[\d.]+/g);

      if (rgb && rgb.length >= 3) {
        const [r, g, b] = rgb.slice(0, 3).map(Number);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        setIsDarkBackground(brightness < 145);
      }
    };

    checkBackground();

    window.addEventListener("scroll", checkBackground, { passive: true });
    window.addEventListener("resize", checkBackground);

    return () => {
      window.removeEventListener("scroll", checkBackground);
      window.removeEventListener("resize", checkBackground);
    };
  }, []);

  return (
    <a
      href="https://www.instagram.com/ved_exim_morbi/"
      target="_blank"
      rel="noopener noreferrer"
      className={`instagram-float-button ${
        isDarkBackground ? "white-button" : "black-button"
      }`}
      aria-label="Follow us on Instagram"
    >
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    </a>
  );
}

export default Instagram;