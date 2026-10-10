import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./ContactPage.css";

function ContactPage() {
  const pageRef = useRef(null);
  const curtainRafRef = useRef(null);
  const heroRef = useRef(null);

  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [sendingInquiry, setSendingInquiry] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project: "",
    requirement: "",
    quantity: "",
    message: "",
  });

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const timer = setTimeout(() => {
      page.classList.add("contact-page-visible");
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateReveal = () => {
      if (curtainRafRef.current) {
        cancelAnimationFrame(curtainRafRef.current);
      }

      curtainRafRef.current = requestAnimationFrame(() => {
        curtainRafRef.current = null;

        const hero = heroRef.current;
        if (!hero) return;

        const rect = hero.getBoundingClientRect();
        const distance = Math.max(window.innerHeight * 0.9, 520);
        const travelled = Math.max(0, -rect.top);

        setRevealProgress(
          Math.min(Math.max(travelled / distance, 0), 1)
        );
      });
    };

    window.addEventListener("scroll", updateReveal, { passive: true });
    window.addEventListener("resize", updateReveal);
    updateReveal();

    return () => {
      window.removeEventListener("scroll", updateReveal);
      window.removeEventListener("resize", updateReveal);

      if (curtainRafRef.current) {
        cancelAnimationFrame(curtainRafRef.current);
        curtainRafRef.current = null;
      }
    };
  }, []);

  const eased =
    revealProgress * revealProgress * (3 - 2 * revealProgress);
  const curtainX = Math.max(0, Math.min(100, 100 - eased * 100));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "contact-reveal-visible"
            );
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    const elements =
      document.querySelectorAll(
        ".contact-reveal"
      );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setInquirySent(false);
    setShowInquiryPopup(true);
  };

  const sendInquiry = async () => {
    setSendingInquiry(true);

    try {
      await emailjs.send(
        "YOUR_EMAILJS_SERVICE_ID",
        "YOUR_EMAILJS_TEMPLATE_ID",
        {
          to_email: "vedeximmorbi@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone,
          project: formData.project,
          requirement: formData.requirement,
          quantity: formData.quantity,
          message: formData.message,
        },
        "YOUR_EMAILJS_PUBLIC_KEY"
      );

      setInquirySent(true);
      setSendingInquiry(false);
    } catch (error) {
      console.error("Inquiry email failed:", error);
      setSendingInquiry(false);
      alert(
        "We could not send the inquiry right now. Please try again."
      );
    }
  };

  const closeInquiryPopup = () => {
    if (sendingInquiry) return;

    setShowInquiryPopup(false);
    setInquirySent(false);
  };

  const finishInquiry = () => {
    setShowInquiryPopup(false);
    setInquirySent(false);

    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      project: "",
      requirement: "",
      quantity: "",
      message: "",
    });
  };

  const whatsappNumber = "916353992729";

  const whatsappMessage = encodeURIComponent(
    "Hello Ved Exim, I would like to discuss my ceramic surface requirement."
  );

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main
      className="contact-page"
      ref={pageRef}
    >

      {/* =================================================
          HERO
      ================================================= */}

      <section className="contact-page-hero" ref={heroRef}>

        <div className="contact-page-hero-background">

          <img
            className="contact-hero-image"
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=88"
            alt="Premium business meeting and partnership"
            loading="eager"
          />

          <div className="contact-hero-orb contact-orb-one" />
          <div className="contact-hero-orb contact-orb-two" />

          <div className="contact-hero-grid" />

        </div>


        <div className="contact-page-hero-content">

          <p className="contact-page-eyebrow">
            VED EXIM · CONTACT
          </p>

          <h1>
            Let's create
            <br />
            <em>something remarkable.</em>
          </h1>

          <p className="contact-page-hero-description">
            Tell us about your project, surface
            requirements or collection interests.
            Our team will help you find the right
            ceramic solution.
          </p>

        </div>


        <div className="contact-page-hero-bottom">

          <span>
            CERAMICS · SURFACES · SANITARYWARE
          </span>

          <span>
            INDIA
          </span>

          <span>
            SCROLL TO CONNECT ↓
          </span>

        </div>

        <div
          className="contact-hero-transition"
          aria-hidden="true"
          style={{
            transform: `translate3d(calc(${curtainX}% + 2px), 0, 0)`,
            opacity: revealProgress > 0.001 ? 1 : 0,
          }}
        >
          <div className="contact-hero-transition-line" />
          <span>VED EXIM · CONTACT</span>
        </div>
      </section>




      {/* =================================================
          CONTACT INTRO
      ================================================= */}

      <section className="contact-connect">

        <div className="contact-section-label contact-reveal">
          <span>01</span>
          LET'S CONNECT
        </div>


        <div className="contact-connect-grid">

          <div className="contact-connect-heading contact-reveal">

            <h2>
              One conversation
              <br />
              <em>can start everything.</em>
            </h2>

          </div>


          <div className="contact-connect-copy contact-reveal">

            <p>
              Whether you are sourcing ceramic
              surfaces for a residential project,
              hospitality development, commercial
              space or distribution requirement,
              we would be happy to understand
              your needs.
            </p>

            <p>
              Share your requirements with us and
              our team can guide you through
              suitable materials, finishes, formats
              and collections.
            </p>

          </div>

        </div>


        {/* CONTACT DETAILS */}

        <div className="contact-detail-grid">

          <a
            href="mailto:vedeximmorbi1@gmail.com"
            className="contact-detail-card contact-reveal"
          >

            <span className="contact-detail-number">
              01
            </span>

            <span className="contact-detail-label">
              EMAIL
            </span>

            <strong>
              vedeximmorbi1@gmail.com
            </strong>

            <span className="contact-detail-arrow">
              ↗
            </span>

          </a>


          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-detail-card contact-reveal"
          >

            <span className="contact-detail-number">
              02
            </span>

            <span className="contact-detail-label">
              WHATSAPP
            </span>

            <strong>
              Chat with VED EXIM
            </strong>

            <span className="contact-detail-arrow">
              ↗
            </span>

          </a>


          <div className="contact-detail-card contact-reveal">

            <span className="contact-detail-number">
              03
            </span>

            <span className="contact-detail-label">
              BUSINESS
            </span>

            <strong>
              Ceramic Surfaces
            </strong>

            <span className="contact-detail-muted">
              Sourcing · Collections · Projects
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          ENQUIRY FORM
      ================================================= */}

      <section className="contact-enquiry">

        <div className="contact-section-label contact-reveal">
          <span>02</span>
          PROJECT ENQUIRY
        </div>


        <div className="contact-enquiry-grid">

          {/* LEFT */}

          <div className="contact-enquiry-intro contact-reveal">

            <p className="contact-page-eyebrow">
              TELL US ABOUT IT
            </p>

            <h2>
              Start with
              <br />
              <em>your requirement.</em>
            </h2>

            <p>
              The more you tell us about your
              project, the better we can understand
              what you are looking for.
            </p>

            <div className="contact-enquiry-note">

              <span>
                RESPONSE
              </span>

              <p>
                Our team will review your enquiry
                and get back to you with the next
                steps.
              </p>

            </div>

          </div>


          {/* FORM */}

          <div className="contact-form-container contact-reveal">




            <form
              className="contact-page-form"
              onSubmit={handleSubmit}
            >

              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="contact-name">
                    YOUR NAME *
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="contact-company">
                    COMPANY
                  </label>

                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                  />

                </div>

              </div>


              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="contact-email">
                    EMAIL ADDRESS *
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />

                </div>


                <div className="contact-field">

                  <label htmlFor="contact-phone">
                    PHONE NUMBER *
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    required
                  />

                </div>

              </div>


              <div className="contact-form-row">

                <div className="contact-field">

                  <label htmlFor="contact-project">
                    PROJECT TYPE
                  </label>

                  <select
                    id="contact-project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select project type
                    </option>

                    <option value="Residential">
                      Residential
                    </option>

                    <option value="Hospitality">
                      Hospitality
                    </option>

                    <option value="Commercial">
                      Commercial
                    </option>

                    <option value="Retail">
                      Retail
                    </option>

                    <option value="Distributor">
                      Distributor / Dealer
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                <div className="contact-field">

                  <label htmlFor="contact-requirement">
                    REQUIREMENT
                  </label>

                  <select
                    id="contact-requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select requirement
                    </option>

                    <option value="Wall Tiles">
                      Wall Tiles
                    </option>

                    <option value="Floor Tiles">
                      Floor Tiles
                    </option>

                    <option value="Vitrified Surfaces">
                      Vitrified Surfaces
                    </option>

                    <option value="Large Format">
                      Large Format
                    </option>

                    <option value="Slabs">
                      Slabs
                    </option>

                    <option value="Sanitaryware">
                      Sanitaryware
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              <div className="contact-field">

                <label htmlFor="contact-quantity">
                  ESTIMATED QUANTITY / AREA
                </label>

                <input
                  id="contact-quantity"
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Example: 5,000 sq. ft."
                />

              </div>


              <div className="contact-field">

                <label htmlFor="contact-message">
                  PROJECT / MESSAGE *
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us about your project, preferred finish, size, quantity or any other requirement..."
                  required
                />

              </div>


              <button
                type="submit"
                className="contact-submit-button"
              >

                <span>
                  SEND INQUIRY
                </span>

                <strong>
                  ↗
                </strong>

              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =================================================
          WHY CONTACT VED EXIM
      ================================================= */}

      <section className="contact-support">

        <div className="contact-section-label contact-reveal">
          <span>03</span>
          HOW WE CAN HELP
        </div>


        <div className="contact-support-grid">

          <div className="contact-support-heading contact-reveal">

            <h2>
              From selection
              <br />
              <em>to sourcing.</em>
            </h2>

          </div>


          <div className="contact-support-list">

            <div className="contact-support-item contact-reveal">

              <span>
                01
              </span>

              <div>

                <h3>
                  Product Selection
                </h3>

                <p>
                  Explore material families,
                  finishes, sizes and surface
                  directions suited to your project.
                </p>

              </div>

            </div>


            <div className="contact-support-item contact-reveal">

              <span>
                02
              </span>

              <div>

                <h3>
                  Project Sourcing
                </h3>

                <p>
                  Share your technical and
                  commercial requirements and
                  discuss suitable sourcing options.
                </p>

              </div>

            </div>


            <div className="contact-support-item contact-reveal">

              <span>
                03
              </span>

              <div>

                <h3>
                  Collection Guidance
                </h3>

                <p>
                  Narrow down the right visual
                  direction, finish and format for
                  the intended application.
                </p>

              </div>

            </div>


            <div className="contact-support-item contact-reveal">

              <span>
                04
              </span>

              <div>

                <h3>
                  Business Enquiries
                </h3>

                <p>
                  Discuss distribution, dealership,
                  commercial sourcing and broader
                  business requirements.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          FAQ
      ================================================= */}

      <section className="contact-faq">

        <div className="contact-section-label contact-reveal">
          <span>04</span>
          FREQUENTLY ASKED
        </div>


        <div className="contact-faq-grid">

          <div className="contact-faq-heading contact-reveal">

            <h2>
              Before you
              <br />
              <em>reach out.</em>
            </h2>

          </div>


          <div className="contact-faq-list">

            <details className="contact-faq-item contact-reveal">

              <summary>
                What information should I include?
                <span>+</span>
              </summary>

              <p>
                Project type, approximate quantity,
                preferred material, finish, size and
                delivery requirement are useful
                starting points. You can also simply
                describe your project in your own
                words.
              </p>

            </details>


            <details className="contact-faq-item contact-reveal">

              <summary>
                Can I enquire about a specific product?
                <span>+</span>
              </summary>

              <p>
                Yes. Mention the product or
                collection name in your message and
                include the quantity or application
                wherever possible.
              </p>

            </details>


            <details className="contact-faq-item contact-reveal">

              <summary>
                Can I contact VED EXIM on WhatsApp?
                <span>+</span>
              </summary>

              <p>
                Yes. Use the WhatsApp button or the
                WhatsApp contact option above to
                start a direct conversation with the
                VED EXIM team.
              </p>

            </details>


            <details className="contact-faq-item contact-reveal">

              <summary>
                Do you handle business enquiries?
                <span>+</span>
              </summary>

              <p>
                Yes. You can use the enquiry form
                for sourcing, distribution, dealer,
                commercial and project-related
                requirements.
              </p>

            </details>

          </div>

        </div>

      </section>


      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="contact-final">

        <div className="contact-final-content contact-reveal">

          <p className="contact-page-eyebrow">
            VED EXIM
          </p>

          <h2>
            Have a project
            <br />
            <em>in mind?</em>
          </h2>

          <p>
            Let's talk about the surface that
            belongs in it.
          </p>

          <div className="contact-final-links">

            <a
              href="mailto:vedeximmorbi@gmail.com"
            >
              EMAIL US
              <span>↗</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              WHATSAPP
              <span>↗</span>
            </a>

            <Link to="/collections">
              VIEW COLLECTIONS
              <span>↗</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =================================================
          INQUIRY CONFIRMATION POPUP
      ================================================= */}

      {showInquiryPopup && (
        <div
          className="inquiry-popup-overlay"
          onClick={closeInquiryPopup}
        >
          <div
            className="inquiry-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            {!sendingInquiry && (
              <button
                type="button"
                className="inquiry-popup-close"
                onClick={closeInquiryPopup}
                aria-label="Close inquiry popup"
              >
                ×
              </button>
            )}

            {!inquirySent ? (
              <>
                <span className="inquiry-popup-eyebrow">
                  VED EXIM · INQUIRY
                </span>

                <div className="inquiry-popup-icon">
                  ?
                </div>

                <h2 id="inquiry-popup-title">
                  Ready to send
                  <br />
                  <em>your enquiry?</em>
                </h2>

                <p>
                  Your enquiry will be sent directly to
                  the VED EXIM email address. Your mail
                  application will not open.
                </p>

                <div className="inquiry-popup-actions">
                  <button
                    type="button"
                    className="inquiry-popup-cancel"
                    onClick={closeInquiryPopup}
                    disabled={sendingInquiry}
                  >
                    CANCEL
                  </button>

                  <button
                    type="button"
                    className="inquiry-popup-send"
                    onClick={sendInquiry}
                    disabled={sendingInquiry}
                  >
                    {sendingInquiry
                      ? "SENDING..."
                      : "SEND INQUIRY"}

                    {!sendingInquiry && (
                      <span>↗</span>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="inquiry-popup-eyebrow">
                  VED EXIM · SUCCESS
                </span>

                <div className="inquiry-popup-icon inquiry-popup-icon-success">
                  ✓
                </div>

                <h2 id="inquiry-popup-title">
                  Inquiry
                  <br />
                  <em>sent successfully.</em>
                </h2>

                <p>
                  Thank you for contacting VED EXIM.
                  Our team will review your requirement
                  and get back to you.
                </p>

                <button
                  type="button"
                  className="inquiry-popup-send inquiry-popup-done"
                  onClick={finishInquiry}
                >
                  DONE
                  <span>↗</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </main>
  );
}

export default ContactPage;
