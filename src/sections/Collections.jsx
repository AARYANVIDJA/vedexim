import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Collections.css";
import SplitHeading from "../components/SplitHeading";

const WHATSAPP_NUMBER = "919909026328";
const EMAIL_ADDRESS = "vedeximmorbi@gmail.com";

const collections = [
  
  {
  number: "01",
  title: "Black Garlic Powder",
  description:
    "Bold and rich tones inspired by black garlic, bringing depth and elegance to modern spaces.",
  image:
    "/images/black-garlic-powder.png",
  inquiry: true,
},

{
  number: "02",
  title: "Garlic powder",
  description:
    "A finely milled garlic powder collection presented with a clean and premium character.",
  image:
    "/images/garlic-powder.png",
  inquiry: true,
},

{
  number: "03",
  title: "Onion powder",
  description:
    "Smooth onion powder with a naturally versatile profile and a minimal presentation.",
  image:
    "/images/onion-powder.png",
  inquiry: true,
},

{
    number: "04",
    title: "Tiles Collection",
    description:
      "Minimal architectural surfaces for modern and understated environments.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    link: "/products?collection=tiles",
    inquiry: false,
  },
];

function InquiryButtons({ productName }) {
  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to inquire about ${productName}.`
  );

  return (
    <div className="collection-inquiry-actions">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="collection-inquiry-btn collection-whatsapp"
        onClick={(event) => event.stopPropagation()}
      >
        <span aria-hidden="true">◉</span>
        Inquire in WhatsApp
      </a>

      <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EMAIL_ADDRESS
  )}&su=${encodeURIComponent(
    `Inquiry - ${productName}`
  )}&body=${encodeURIComponent(
    `Hello,\n\nI would like to inquire about ${productName}.\n\nThank you.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="collection-inquiry-btn collection-email"
  onClick={(event) => event.stopPropagation()}
>
  <span aria-hidden="true">✉</span>
  Inquire in Gmail
</a>
    </div>
  );
}

function CollectionCard({ collection, index }) {
  const cardContent = (
    <>
      <div className="collection-image">
        <img
          src={collection.image}
          alt={`${collection.title} collection`}
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="collection-overlay" />
      </div>

      <div className="collection-content">
        <div className="collection-top">
          <span className="collection-number">{collection.number}</span>

          {!collection.inquiry && (
            <span className="collection-arrow">↗</span>
          )}
        </div>

        <div className="collection-bottom">
          <h3>{collection.title}</h3>

          <p>{collection.description}</p>

          {collection.inquiry && (
            <InquiryButtons productName={collection.title} />
          )}
        </div>
      </div>
    </>
  );

  if (collection.inquiry) {
    return (
      <article
        className={`collection-card collection-card-${index + 1} collection-card-inquiry`}
      >
        {cardContent}
      </article>
    );
  }

  return (
    <Link
      to={collection.link}
      className={`collection-card collection-card-${index + 1}`}
    >
      {cardContent}
    </Link>
  );
}

function Collections() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("collections-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="collections-section"
      id="collections"
      ref={sectionRef}
    >
      <div className="collections-header">
        <div>
          <p className="collections-label">OUR COLLECTIONS</p>

          <SplitHeading
            tag="h2"
            lines={[
              { text: "Our selected" },
              { text: "collection.", italic: true },
            ]}
            className="collections-title"
            visibleClass="collections-visible"
            baseDelay={100}
            charDelay={40}
            lineGap={90}
          />
        </div>

        <p className="collections-intro">
          Explore our selected collection, from architectural ceramic
          surfaces to refined powder products, presented with a clean and
          contemporary visual language.
        </p>
      </div>

      <div className="collections-grid">
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.number}
            collection={collection}
            index={index}
          />
        ))}
      </div>

      <div className="collections-footer">
        <span>VED EXIM</span>
        <span>EXPLORE THE MATERIAL</span>
        <span>COLLECTIONS</span>
      </div>
    </section>
  );
}

export default Collections;
