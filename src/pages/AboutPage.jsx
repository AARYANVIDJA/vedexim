import { Link } from "react-router-dom";
import "./AboutPage.css";

const values = [
  {
    number: "01",
    title: "Quality",
    text: "Every surface begins with a commitment to dependable quality, carefully considered materials and lasting performance.",
  },
  {
    number: "02",
    title: "Precision",
    text: "We believe refined spaces are built through attention to proportion, detail, finish and consistency.",
  },
  {
    number: "03",
    title: "Design",
    text: "Our collections balance contemporary aesthetics with timeless material character to create surfaces that remain relevant.",
  },
];

const strengths = [
  "Curated ceramic surfaces",
  "Contemporary design language",
  "Attention to material detail",
  "Reliable quality standards",
  "Solutions for modern spaces",
  "Long-term customer relationships",
];

function AboutPage() {
  return (
    <main className="about-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="about-hero">

        <div className="about-hero-image">
          <video
            className="about-hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Premium ceramic surfaces"
          >
            <source src="/videos/ceramic-hero.mp4" type="video/mp4" />
          </video>

          <div className="about-hero-overlay" />
        </div>

        <div className="about-hero-content">

          <p className="about-eyebrow">
            VED EXIM · ABOUT US
          </p>

          <h1>
            Surfaces
            <br />
            <em>with purpose.</em>
          </h1>

          <p className="about-hero-description">
            We bring together refined ceramic surfaces,
            contemporary design and dependable quality
            to create spaces that feel considered,
            timeless and distinctly modern.
          </p>

        </div>

        <div className="about-hero-meta">

          <span>
            VED EXIM
          </span>

          <span>
            EST. 1998
          </span>

          <span>
            SCROLL TO EXPLORE ↓
          </span>

        </div>

      </section>

      {/* =========================================
          INTRO
      ========================================= */}

      <section className="about-introduction">

        <div className="about-section-label">
          <span>01</span>
          ABOUT VED EXIM
        </div>

        <div className="about-introduction-content">

          <h2>
            Creating spaces
            <br />
            <em>with character.</em>
          </h2>

          <div className="about-introduction-text">

            <p>
              VED EXIM brings together refined ceramic
              surfaces, contemporary design and
              dependable quality to create spaces that
              feel timeless.
            </p>

            <p>
              From carefully selected ceramic tiles to
              sophisticated surface solutions, every
              collection is chosen with attention to
              detail, durability and modern aesthetics.
            </p>

            <p>
              Our approach is simple: understand the
              character of a space, select materials with
              purpose and deliver surfaces that complement
              the architecture around them.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          LARGE STATEMENT
      ========================================= */}

      <section className="about-statement">

        <div className="about-statement-inner">

          <p className="about-eyebrow">
            OUR PHILOSOPHY
          </p>

          <h2>
            Material is more
            <br />
            than a surface.
          </h2>

          <p>
            It shapes how a space feels, how light moves
            through it and how people experience it.
          </p>

        </div>

      </section>


      {/* =========================================
          VALUES
      ========================================= */}

      <section className="about-values">

        <div className="about-section-label">
          <span>02</span>
          WHAT WE BELIEVE
        </div>

        <div className="about-values-grid">

          {values.map((value) => (

            <article
              className="about-value-card"
              key={value.number}
            >

              <span className="about-value-number">
                {value.number}
              </span>

              <div>

                <h3>
                  {value.title}
                </h3>

                <p>
                  {value.text}
                </p>

              </div>

              <span className="about-value-arrow">
                ↗
              </span>

            </article>

          ))}

        </div>

      </section>


      {/* =========================================
          MATERIAL IMAGE SECTION
      ========================================= */}

      <section className="about-material">

        <div className="about-material-image">

          <img
            src="/images/products/12%20x%2012/Stone.png"
            alt="VED EXIM ceramic material"
          />

        </div>

        <div className="about-material-content">

          <p className="about-eyebrow">
            MATERIAL PHILOSOPHY
          </p>

          <h2>
            Designed around
            <br />
            <em>material.</em>
          </h2>

          <p>
            We believe the right surface should do more
            than fill a space. It should contribute to the
            atmosphere, balance and identity of the
            architecture around it.
          </p>

          <p>
            Our collections explore stone-inspired
            textures, marble movement, contemporary
            terrazzo and architectural concrete tones —
            creating a versatile material language for
            modern interiors.
          </p>

        </div>

      </section>


      {/* =========================================
          WHY VED EXIM
      ========================================= */}

      <section className="about-strengths">

        <div className="about-section-label">
          <span>03</span>
          WHY VED EXIM
        </div>

        <div className="about-strengths-content">

          <div className="about-strengths-heading">

            <h2>
              Considered
              <br />
              <em>by design.</em>
            </h2>

          </div>

          <div className="about-strengths-list">

            {strengths.map((strength, index) => (

              <div
                className="about-strength-item"
                key={strength}
              >

                <span>
                  0{index + 1}
                </span>

                <strong>
                  {strength}
                </strong>

                <span>
                  ↗
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          APPROACH
      ========================================= */}

      <section className="about-approach">

        <div className="about-approach-heading">

          <p className="about-eyebrow">
            OUR APPROACH
          </p>

          <h2>
            From selection
            <br />
            <em>to space.</em>
          </h2>

        </div>


        <div className="about-approach-steps">

          <div>
            <span>01</span>
            <h3>Understand</h3>
            <p>
              We begin by understanding the project,
              architecture and intended atmosphere.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Curate</h3>
            <p>
              Materials and surfaces are considered
              according to colour, texture, scale and use.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Deliver</h3>
            <p>
              The final selection is brought together
              with consistency, care and attention to detail.
            </p>
          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="about-cta">

        <p className="about-eyebrow">
          VED EXIM
        </p>

        <h2>
          Let's create
          <br />
          <em>something remarkable.</em>
        </h2>

        <p>
          Discover the collection and find the surface
          that belongs in your next space.
        </p>

        <div className="about-cta-actions">

          <Link
            to="/collections"
            className="about-cta-link"
          >
            EXPLORE COLLECTIONS
            <span>↗</span>
          </Link>

          <Link
            to="/contact"
            className="about-cta-link"
          >
            START A CONVERSATION
            <span>↗</span>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default AboutPage;
