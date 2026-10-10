import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const address =
    "Ground Floor, Shivam Chambers 1, Shop No. 10, Survey No. 93 Paiki 3, Plot No. 1 Paiki, Morbi-Halvad Road, Near LUXGRES CERAMICA LLP, Unchi Mandal, Nichi Mandal, Morbi, Gujarat 363330, India.";

  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Ground+Floor,+Shivam+Chambers+1,+Shop+No.+10,+Survey+No.+93+Paiki+3,+Plot+No.+1+Paiki,+Morbi-Halvad+Road,+Near+LUXGRES+CERAMICA+LLP,+Unchi+Mandal,+Nichi+Mandal,+Morbi,+Gujarat+363330,+India";

  return (
    <footer className="footer">
      {/* BACKGROUND GRID */}
      <div className="footer-grid" aria-hidden="true" />

      {/* CTA */}
      <div className="footer-cta">
        <h2>
          LET&apos;S BUILD SOMETHING
          <br />
          <em>AMAZING</em> TOGETHER
        </h2>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        {/* BRAND */}
        <div className="footer-brand">
          <a href="/" className="footer-logo-link" aria-label="VED EXIM Home">
            <img
              src="/images/logo/vedexim.png"
              alt="VED EXIM"
              className="footer-logo"
            />
          </a>

          <div className="footer-social">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              𝕏
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              ◎
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <div className="footer-column-title">
            <span>QUICK LINKS</span>
            <i />
          </div>

          <nav className="footer-links">
            <a href="/">HOME</a>
            <a href="/about">ABOUT</a>
            <a href="/collections">COLLECTIONS</a>
            <a href="/products">PRODUCTS</a>
            <a href="/process">OUR PROCESS</a>
            <a href="/contact">CONTACT</a>
          </nav>
        </div>

        {/* QUICK SUPPORT */}
        <div className="footer-column">
          <div className="footer-column-title">
            <span>QUICK SUPPORT</span>
            <i />
          </div>

          <div className="footer-support">
            <a href="tel:+919909026328">
              <strong>T :</strong> +91 9163539 92729
            </a>

            <a href="mailto:vedeximmorbi1@gmail.com">
              <strong>E :</strong> vedeximmorbi1@gmail.com
            </a>

            <a href="https://wa.me/916353992729" target="_blank" rel="noopener noreferrer">
              <strong>W :</strong> WhatsApp Us
            </a>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="footer-column footer-address-column">
          <div className="footer-column-title">
            <span>ADDRESS</span>
            <i />
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-address"
          >
            {address}
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>Copyright © 2026 VED EXIM</span>

        <span>CERAMICS · SURFACES · SANITARYWARE</span>

        <button
          type="button"
          onClick={scrollToTop}
          className="footer-top-button"
        >
          BACK TO TOP <span>↑</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;