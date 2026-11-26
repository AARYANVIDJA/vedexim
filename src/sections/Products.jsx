import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import SplitHeading from "../components/SplitHeading";

const products = [
  {
    number: "01",
    name: "Calacatta",
    category: "MARBLE COLLECTION",
    description:
      "A refined marble-inspired surface with elegant veining and a timeless character.",
    image: "/images/products/marble/marble-01.png",
  },
  {
    number: "02",
    name: "Travertine",
    category: "STONE COLLECTION",
    description:
      "Warm natural tones and subtle texture designed for sophisticated interiors.",
    image: "/images/products/stone/stone-01.png",
  },
  {
    number: "03",
    name: "Terrazzo",
    category: "TERRAZZO COLLECTION",
    description:
      "A playful yet refined composite finish for contemporary and eclectic spaces.",
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "04",
    name: "Concrete",
    category: "CONCRETE COLLECTION",
    description:
      "A minimal architectural surface with a subtle texture and a modern aesthetic.",
    image: "/images/products/concrete/concrete-01.png",
  },
];

function getProductWhatsAppUrl(product) {
  const phoneNumber = "916353992729";
  const message = `Hello Ved Exim, I would like to inquire about *${product.name}* (${product.category}).\n\nPlease share more details, pricing, and availability.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function Products() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("products-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="products-section"
      id="products"
      ref={sectionRef}
    >
      {/* HEADER */}

      <div className="products-header">

        <div>

          <p className="products-label">
            FEATURED PRODUCTS
          </p>

          <SplitHeading
            tag="h2"
            lines={[
              { text: "Designed for" },
              { text: "beautiful spaces.", italic: true },
            ]}
            className="products-title"
            visibleClass="products-visible"
            baseDelay={100}
            charDelay={38}
            lineGap={80}
          />

        </div>

        <p className="products-intro">
          Discover selected surfaces from the VED EXIM
          collection, created to combine refined aesthetics,
          dependable quality and contemporary design.
        </p>

      </div>


      {/* PRODUCTS */}

      <div className="products-grid">

        {products.map((product, index) => (
          <Link
            to="/products"
            className="product-card"
            key={product.number}
          >

            <div className="product-image">

              <img
                src={product.image}
                alt={`${product.name} ceramic surface`}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable="false"
              />

              <div className="product-image-overlay"></div>

            </div>


            <div className="product-content">

              <div className="product-top">

                <span className="product-number">
                  {product.number}
                </span>

                <span className="product-category">
                  {product.category}
                </span>

              </div>


              <div className="product-bottom">

                <div>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>
                </div>

                <span className="product-arrow">
                  ↗
                </span>

              </div>

            </div>

          </Link>
        ))}

      </div>


      {/* FOOTER */}

      <div className="products-footer">

        <span>
          VED EXIM
        </span>

        <span>
          CURATED SURFACES
        </span>

        <Link to="/products" className="products-footer-link">
          VIEW ALL PRODUCTS ↗
        </Link>

      </div>

    </section>
  );
}

export default Products;