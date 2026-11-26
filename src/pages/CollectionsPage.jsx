import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import "./CollectionsPage.css";

const WHATSAPP_NUMBER = "916353992729";
const EMAIL_ADDRESS = "vedeximmorbi1@gmail.com";

const organicPowders = [
  {
    name: "BLACK GARLIC POWDER",
    image: "/images/black-garlic-powder.png",
    description: "Premium organic black garlic powder for food and culinary applications.",
  },
  {
    name: "GARLIC POWDER",
    image: "/images/garlic-powder-product.png",
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

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const timer = window.setTimeout(() => {
      page.classList.add("collections-page-visible");
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

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
                  src="/images/garlic-powder-product.png"
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
              data-lenis-prevent
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