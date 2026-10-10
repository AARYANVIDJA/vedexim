import { useEffect, useState } from "react";
import "./WhatsAppButton.css";

function WhatsAppButton() {
  const phoneNumber = "916353992729";

  const message = encodeURIComponent(
    "Hello Ved Exim, I would like to know more about your ceramic products."
  );

  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${message}`;

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const button = document.querySelector(
        ".whatsapp-button"
      );

      if (!button) return;

      const rect =
        button.getBoundingClientRect();

      /*
        Temporarily allow element underneath
        the WhatsApp button to be detected.
      */

      const oldPointerEvents =
        button.style.pointerEvents;

      button.style.pointerEvents = "none";

      const element = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      button.style.pointerEvents =
        oldPointerEvents;

      if (!element) return;

      /*
        Find the actual section underneath.
      */

      let current = element;

      let backgroundColor =
        "rgb(243, 240, 234)";

      while (
        current &&
        current !== document.body
      ) {
        const style =
          window.getComputedStyle(current);

        const bg =
          style.backgroundColor;

        /*
          Ignore transparent backgrounds
          and continue checking the parent.
        */

        if (
          bg &&
          bg !== "transparent" &&
          bg !== "rgba(0, 0, 0, 0)"
        ) {
          backgroundColor = bg;
          break;
        }

        current = current.parentElement;
      }

      /*
        Convert RGB to brightness.
      */

      const rgb =
        backgroundColor.match(/\d+/g);

      if (!rgb || rgb.length < 3) {
        return;
      }

      const r = Number(rgb[0]);
      const g = Number(rgb[1]);
      const b = Number(rgb[2]);

      const brightness =
        (r * 299 +
          g * 587 +
          b * 114) /
        1000;

      /*
        DARK SCREEN
        → WHITE BUTTON

        LIGHT SCREEN
        → BLACK BUTTON
      */

      setIsDark(brightness < 140);
    };

    window.addEventListener(
      "scroll",
      checkBackground,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      checkBackground
    );

    /*
      Check after page loads.
    */

    checkBackground();

    /*
      Check again after images/content load.
    */

    const timer = setTimeout(
      checkBackground,
      500
    );

    return () => {
      window.removeEventListener(
        "scroll",
        checkBackground
      );

      window.removeEventListener(
        "resize",
        checkBackground
      );

      clearTimeout(timer);
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-button ${
        isDark
          ? "dark-mode"
          : "light-mode"
      }`}
      aria-label="Chat with Ved Exim on WhatsApp"
    >

      {/* POPUP */}

      <span className="whatsapp-tooltip">
        Chat with Ved Exim
      </span>


      {/* WHATSAPP ICON */}

      <span className="whatsapp-icon">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
        >

          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.59C14.65 13.5 14.48 13.46 14.32 13.71C14.15 13.95 13.67 14.52 13.52 14.69C13.38 14.85 13.23 14.88 12.98 14.75C12.74 14.63 11.95 14.37 11.01 13.53C10.28 12.88 9.78 12.07 9.64 11.83C9.5 11.58 9.62 11.45 9.75 11.32C9.86 11.21 10 11.04 10.12 10.9C10.24 10.75 10.28 10.65 10.36 10.49C10.44 10.32 10.4 10.18 10.34 10.05C10.28 9.93 9.79 8.73 9.59 8.24C9.39 7.76 9.19 7.82 9.04 7.81H8.57C8.41 7.81 8.15 7.87 7.93 8.11C7.71 8.35 7.09 8.93 7.09 10.11C7.09 11.29 7.95 12.42 8.07 12.59C8.19 12.75 9.77 15.18 12.18 16.23C12.76 16.48 13.2 16.62 13.56 16.74C14.14 16.92 14.67 16.89 15.08 16.83C15.55 16.76 16.52 16.24 16.73 15.67C16.93 15.09 16.93 14.6 16.87 14.5C16.81 14.41 16.65 14.35 16.57 14.39Z"/>

        </svg>

      </span>

    </a>
  );
}

export default WhatsAppButton;  