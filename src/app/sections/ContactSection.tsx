import "../styles/contact.css";
export default function ContactSection() {
  return (
    <section className="contact-section">
  <div className="container">
    <header className="contact-header">
      <h2>GET IN TOUCH</h2>
    </header>

    <div className="contact-grid">
      
      <figure className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.7241609902394!2d115.06136577500862!3d-8.129540291900181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19b007c2426d3%3A0xfcba4a551fcaefa3!2sJepun%20Bali%20Kencana!5e0!3m2!1sid!2sid!4v1765445590587!5m2!1sid!2sid"
              style={{
                border: 0,
                width: "100%",
                height: "100%",
                borderRadius: "12px",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jepun Bali Kencana Location Map"
            />
          </figure>

      <article className="contact-info">

        <div className="contact-block">
          <h3>Phone</h3>
          <p>+62 878-5605-2262</p>
        </div>

        <address className="contact-address">
          <h3>Based in</h3>
          <p>
            Pemaron, Kec. Buleleng,<br />
            Kabupaten Buleleng, Bali
          </p>
        </address>

        <nav className="contact-socials" aria-label="Social media">
          <a href="#" aria-label="Facebook">
            <img src="/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="#" aria-label="WhatsApp">
            <img src="/icons/whatsapp.svg" alt="WhatsApp" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
        </nav>

      </article>

    </div>
  </div>
</section>

  );
}
