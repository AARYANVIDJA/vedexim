import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import SplitHeading from "../components/SplitHeading";

function Contact() {
  const sectionRef = useRef(null);

  const [showAlert, setShowAlert] = useState(false);
  const [sendingInquiry, setSendingInquiry] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
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

  const handleSubmit = (event) => {
    event.preventDefault();

    setInquirySent(false);
    setShowAlert(true);
  };

  const sendInquiry = async () => {
    const form = document.querySelector(".contact-form");

    if (!form) return;

    setSendingInquiry(true);

    const formData = new FormData(form);

    try {
      await emailjs.send(
        "YOUR_EMAILJS_SERVICE_ID",
        "YOUR_EMAILJS_TEMPLATE_ID",
        {
          to_email: "vedeximmorbi1@gmail.com",
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        },
        "YOUR_EMAILJS_PUBLIC_KEY"
      );

      setInquirySent(true);
      setSendingInquiry(false);
    } catch (error) {
      console.error("Inquiry email failed:", error);

      setSendingInquiry(false);

      alert(
        "We could not send your inquiry right now. Please try again."
      );
    }
  };

  const closeAlert = () => {
    if (sendingInquiry) return;

    setShowAlert(false);
    setInquirySent(false);
  };

  const finishInquiry = () => {
    const form = document.querySelector(".contact-form");

    if (form) {
      form.reset();
    }

    setShowAlert(false);
    setInquirySent(false);
  };

  return (
    <>
      <section
        className="contact-section"
        id="contact"
        ref={sectionRef}
      >

        {/* LEFT CONTENT */}

        <div className="contact-intro">

          <p className="contact-label">
            GET IN TOUCH
          </p>

          <SplitHeading
            tag="h2"
            lines={[
              { text: "Let's create" },
              { text: "something ", italic: true },
              { text: "remarkable.", italic: true },
            ]}
            visibleClass="is-visible"
            baseDelay={100}
            charDelay={36}
            lineGap={70}
          />

          <p className="contact-description">
            Tell us about your project, requirements or
            collection interests. Our team will be happy
            to help you find the right surface solution.
          </p>

          <div className="contact-details">

            <a href="mailto:vedeximmorbi1@gmail.com">
              vedeximmorbi1@gmail.com
            </a>

            <a href="tel:+916353992729">
              +91 6353 992 729
            </a>

          </div>

        </div>


        {/* FORM */}

        <div className="contact-form-wrapper">

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-field">

              <label htmlFor="name">
                YOUR NAME
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />

            </div>


            <div className="form-field">

              <label htmlFor="email">
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />

            </div>


            <div className="form-field">

              <label htmlFor="phone">
                PHONE NUMBER
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
              />

            </div>


            <div className="form-field">

              <label htmlFor="message">
                PROJECT / MESSAGE
              </label>

              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Tell us about your project"
                required
              ></textarea>

            </div>


            <button
              type="submit"
              className="contact-submit"
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


        {/* BOTTOM */}

        <div className="contact-bottom">

          <span>
            VED EXIM
          </span>

          <span>
            CERAMICS · SURFACES · SANITARYWARE
          </span>

          <span>
            INDIA
          </span>

        </div>

      </section>


      {/* INQUIRY POPUP */}

      {showAlert && (
        <div
          className="inquiry-alert inquiry-alert-overlay"
          onClick={closeAlert}
        >

          <div
            className="inquiry-alert-box inquiry-popup-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-inquiry-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {!sendingInquiry && (
              <button
                type="button"
                className="inquiry-alert-close"
                onClick={closeAlert}
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

                <div className="inquiry-check inquiry-question">
                  ?
                </div>

                <div>

                  <p
                    id="contact-inquiry-title"
                    className="inquiry-alert-title inquiry-popup-heading"
                  >
                    Ready to send
                    <br />
                    <em>your enquiry?</em>
                  </p>

                  <p className="inquiry-alert-text">
                    Your enquiry will be sent directly to
                    VED EXIM. Your mail application will
                    not open.
                  </p>

                </div>


                <div className="inquiry-popup-actions">

                  <button
                    type="button"
                    className="inquiry-popup-cancel"
                    onClick={closeAlert}
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

                <div className="inquiry-check inquiry-success">
                  ✓
                </div>

                <div>

                  <p
                    id="contact-inquiry-title"
                    className="inquiry-alert-title inquiry-popup-heading"
                  >
                    Inquiry sent
                    <br />
                    <em>successfully.</em>
                  </p>

                  <p className="inquiry-alert-text">
                    Thank you for contacting VED EXIM.
                    Our team will get back to you soon.
                  </p>

                </div>


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
    </>
  );
}

export default Contact;