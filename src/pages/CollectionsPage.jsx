import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import "./CollectionsPage.css";

const WHATSAPP_NUMBER = "919909026328";
const EMAIL_ADDRESS = "vedeximmorbi1@gmail.com";

const organicPowders = [
  {
    name: "BLACK GARLIC POWDER",
    image: "/images/black-garlic-powder.png",
    description: "Premium organic black garlic powder for food and culinary applications.",
  },
  {
    name: "GARLIC POWDER",
    image: "/images/garlic-powder.png",
    description: "Fine organic garlic powder with a clean, versatile profile for everyday use.",
  },
  {
    name: "ONION POWDER",
    image: "/images/onion-powder.png",
    description: "Premium organic onion powder prepared for convenient culinary use.",
  },
];

const collections = [
  {
    number: "01",
    name: "12 X 12",
    subtitle: "WATERPROOF CERAMIC TILES",
    description:
      "Waterproof 12 X 12 ceramic tiles designed for durable, easy-clean surfaces and moisture-prone spaces.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85",
    size: "12 X 12",
  },
  {
    number: "02",
    name: "16 X 16",
    subtitle: "WATERPROOF CERAMIC TILES",
    description:
      "Waterproof 16 X 16 tiles with a durable surface, practical maintenance and a clean architectural look.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    size: "16 X 16",
  },
];

function CollectionsPage() {
  const pageRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [isOrganicOpen, setIsOrganicOpen] = useState(false);

  useEffect(() => {
    if (!isOrganicOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOrganicOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOrganicOpen]);

  /* =========================================
     PAGE ENTRANCE
  ========================================= */

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const timer = setTimeout(() => {
      page.classList.add("collections-page-visible");
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  /* =========================================
     LENIS / SCROLL TRANSITION
  ========================================= */

  useEffect(() => {
    const calculateProgress = (scrollValue) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const page = pageRef.current;

        if (!page) return;

        /*
         * Collections page begins at its own document position.
         * This keeps the effect correct when arriving from another
         * React route as well as after a fresh reload.
         */

        const pageTop =
          page.getBoundingClientRect().top + scrollValue;

        const distance = Math.max(
          window.innerHeight * 0.9,
          500
        );

        const travelled = Math.max(
          0,
          scrollValue - pageTop
        );

        const nextProgress = Math.min(
          Math.max(travelled / distance, 0),
          1
        );

        if (
          Math.abs(
            nextProgress - progressRef.current
          ) > 0.001
        ) {
          progressRef.current = nextProgress;
          setProgress(nextProgress);
        }
      });
    };

    const handleLenisScroll = (event) => {
      calculateProgress(event.scroll);
    };

    let subscribed = false;
    let retryTimer = null;

    const subscribeToLenis = () => {
      if (
        subscribed ||
        !window.lenis
      ) {
        return;
      }

      window.lenis.on(
        "scroll",
        handleLenisScroll
      );

      subscribed = true;

      calculateProgress(
        window.lenis.scroll || 0
      );
    };

    subscribeToLenis();

    /*
     * SmoothScroll mounts at the same time as the route.
     * Retry briefly in case Lenis has not been created yet.
     */

    if (!subscribed) {
      retryTimer = setInterval(() => {
        subscribeToLenis();

        if (subscribed) {
          clearInterval(retryTimer);
          retryTimer = null;
        }
      }, 50);
    }

    /*
     * Native fallback if Lenis is unavailable.
     */

    const handleNativeScroll = () => {
      if (!window.lenis) {
        calculateProgress(
          window.scrollY || 0
        );
      }
    };

    const handleResize = () => {
      calculateProgress(
        window.lenis?.scroll ||
        window.scrollY ||
        0
      );
    };

    window.addEventListener(
      "scroll",
      handleNativeScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    handleResize();

    return () => {
      if (retryTimer) {
        clearInterval(retryTimer);
      }

      if (
        subscribed &&
        window.lenis
      ) {
        window.lenis.off(
          "scroll",
          handleLenisScroll
        );
      }

      window.removeEventListener(
        "scroll",
        handleNativeScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, []);

  /* =========================================
     PREMIUM EASING
  ========================================= */

  const eased =
    progress * progress *
    (3 - 2 * progress);

  const curtainX =
    100 - eased * 100;

  const heroImageX =
    eased * -2.5;

  const heroImageScale =
    1 + eased * 0.025;

  const heroContentX =
    eased * -45;

  const heroContentOpacity =
    Math.max(
      0,
      1 - eased * 1.15
    );

  return (
    <main
      className="collections-page"
      ref={pageRef}
    >

      {/* =========================================
          HERO — CERAMIC VIDEO
      ========================================= */}

      <section className="collections-page-hero">

        <video
          className="collections-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/products/products-hero-poster.jpg"
          style={{
            transform: `
              translate3d(${heroImageX}%, 0, 0)
              scale(${heroImageScale})
            `,
          }}
        >
          <source
            src="/videos/ceramic-hero-02.mp4"
            type="video/mp4"
          />

          Your browser does not support
          the video element.
        </video>

        <div
          className="collections-hero-video-overlay"
        />

        {/* HERO CONTENT */}

        <div
          className="collections-page-hero-content"
          style={{
            transform: `
              translate3d(
                ${heroContentX}px,
                -50%,
                0
              )
            `,
            opacity: heroContentOpacity,
          }}
        >

          <p className="collections-page-label">
            VED EXIM · COLLECTIONS
          </p>

          <h1>
            Surfaces
            <br />
            <em>with character.</em>
          </h1>

          <p className="collections-page-description">
            A curated range of waterproof ceramic tiles
            created to bring material depth,
            refined detail and timeless character
            to contemporary spaces.
          </p>

          <a
            href="#collections"
            className="collections-hero-button"
          >
            EXPLORE COLLECTIONS

            <span>
              ↓
            </span>
          </a>

        </div>

        {/* HERO META */}

        <div
          className="collections-page-hero-meta"
          style={{
            opacity:
              Math.max(
                0,
                1 - eased * 1.2
              ),
          }}
        >

          <span>
            02 COLLECTIONS
          </span>

          <span>
            CERAMIC · SURFACES · DESIGN
          </span>

          <span>
            SCROLL TO EXPLORE ↓
          </span>

        </div>

        {/* =========================================
            HORIZONTAL CURTAIN
        ========================================= */}

        <div
          className="collections-horizontal-curtain"
          aria-hidden="true"
          style={{
            transform: `
              translate3d(
                ${curtainX}%,
                0,
                0
              )
            `,
          }}
        >

          <div
            className="collections-horizontal-curtain-line"
          />

          <span>
            VED EXIM · COLLECTIONS
          </span>

        </div>

      </section>


      {/* =========================================
          COLLECTIONS
      ========================================= */}

      <section
        id="collections"
        className="collections-page-list"
      >

        <div className="collections-page-intro">

          <p>
            EXPLORE THE COLLECTION
          </p>

          <span>
            Each collection has its own material
            language, designed to work beautifully
            across residential, hospitality and
            commercial environments.
          </span>

        </div>


        <div className="collections-page-grid">

          {collections.map(
            (collection, index) => (

              <article
                className={
                  `collection-page-card collection-page-card-${index + 1}`
                }
                key={collection.number}
              >

                <Link
                  to={`/products?size=${encodeURIComponent(collection.size)}`}
                  className="collection-image-button"
                  aria-label={
                    `View ${collection.name} products`
                  }
                >

                  <div
                    className="collection-page-image"
                  >

                    <img
                      src={collection.image}
                      alt={
                        `${collection.name} waterproof ceramic tiles`
                      }
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                    />

                    <div
                      className=
                        "collection-page-image-overlay"
                    />

                  </div>

                </Link>


                <div
                  className=
                    "collection-page-content"
                >

                  <div
                    className=
                      "collection-page-top"
                  >

                    <span
                      className=
                        "collection-page-number"
                    >
                      {collection.number}
                    </span>

                    <span
                      className=
                        "collection-page-subtitle"
                    >
                      {collection.subtitle}
                    </span>

                  </div>


                  <div
                    className=
                      "collection-page-bottom"
                  >

                    <div>

                      <h2>
                        {collection.name}
                      </h2>

                      <p>
                        {collection.description}
                      </p>

                    </div>


                    <Link
                      to={`/products?size=${encodeURIComponent(collection.size)}`}
                      className=
                        "collection-page-arrow"
                      aria-label={
                        `View ${collection.name} products`
                      }
                    >
                      ↗
                    </Link>

                  </div>

                </div>

              </article>

            )
          )}

          <article
            className="collection-page-card collection-page-card-organic collection-page-card-3"
          >
            <button
              type="button"
              className="collection-image-button"
              onClick={() => setIsOrganicOpen(true)}
              aria-label="Open organic powder collection"
            >
              <div className="collection-page-image organic-powder-collection-image">
                <img
                  src="/images/garlic-powder.png"
                  alt="Organic powders collection"
                  loading="lazy"
                />
                <div className="collection-page-image-overlay" />
              </div>
            </button>

            <div className="collection-page-content">
              <div className="collection-page-top">
                <span className="collection-page-number">03</span>
                <span className="collection-page-subtitle">ORGANIC POWDERS</span>
              </div>

              <div className="collection-page-bottom">
                <div>
                  <h2>Organic Powder</h2>
                  <p>Explore our three premium organic powder products and inquire directly with our team.</p>
                </div>

                <button
                  type="button"
                  className="collection-page-arrow organic-powder-open-button"
                  onClick={() => setIsOrganicOpen(true)}
                  aria-label="Open organic powder products"
                >
                  ↗
                </button>
              </div>
            </div>
          </article>

        </div>

      </section>

      {isOrganicOpen && typeof document !== "undefined" &&
        createPortal(
          <div
            className="organic-powder-modal"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOrganicOpen(false);
              }
            }}
          >
            <div
              className="organic-powder-modal-box"
              role="dialog"
              aria-modal="true"
              aria-labelledby="organic-powder-modal-title"
            >
              <button
                type="button"
                className="organic-powder-modal-close"
                onClick={() => setIsOrganicOpen(false)}
                aria-label="Close organic powder collection"
              >
                ×
              </button>

              <div className="organic-powder-modal-heading">
                <span>VED EXIM · ORGANIC RANGE</span>
                <h2 id="organic-powder-modal-title">Organic Powder</h2>
                <p>Choose a powder to inquire about availability, pricing and specifications.</p>
              </div>

              <div className="organic-powder-modal-grid">
                {organicPowders.map((powder) => {
                  const message = `Hello, I would like to inquire about ${powder.name}.`;
                  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
                  const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_ADDRESS)}&su=${encodeURIComponent(`Inquiry - ${powder.name}`)}&body=${encodeURIComponent(`${message}\n\nThank you.`)}`;

                  return (
                    <article className="organic-powder-modal-card" key={powder.name}>
                      <div className="organic-powder-modal-image">
                        <img src={powder.image} alt={powder.name} loading="lazy" />
                      </div>

                      <div className="organic-powder-modal-card-content">
                        <span>ORGANIC POWDER</span>
                        <h3>{powder.name}</h3>
                        <p>{powder.description}</p>

                        <div className="organic-powder-inquiry-actions">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="organic-powder-whatsapp-button"
                          >
                            WhatsApp Inquiry
                          </a>
                          <a
                            href={emailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="organic-powder-email-button"
                          >
                            Email Inquiry
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )}



      {/* =========================================
          CTA
      ========================================= */}

      <section
        className="collections-page-cta"
      >

        <p className="collections-page-label">
          FIND YOUR SURFACE
        </p>

        <h2>
          Have a project
          <br />
          <em>in mind?</em>
        </h2>

        <p>
          Tell us what you're creating and
          we'll help you discover the right
          VED EXIM collection.
        </p>

        <Link
          to="/contact"
          className=
            "collections-page-cta-button"
        >
          START A CONVERSATION

          <span>
            ↗
          </span>
        </Link>

      </section>

    </main>
  );
}

export default CollectionsPage;