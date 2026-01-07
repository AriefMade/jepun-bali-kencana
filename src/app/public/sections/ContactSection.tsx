'use client'
import { useState, useEffect } from 'react';
import "../styles/contact.css";

type ProfileData = {
  phone: string;
  address: string;
  facebook: string | null;
  whatsapp: string | null;
  instagram: string | null;
  gmaps: string | null;
};

export default function ContactSection() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const res = await fetch('/api/profile-data');
      const data = await res.json();
      
      if (data.success) {
        setProfileData(data.profileData);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="contact-section">
        <div className="container">
          <header className="contact-header">
            <h2>GET IN TOUCH</h2>
          </header>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }

  if (!profileData) {
    return (
      <section id="contact" className="contact-section">
        <div className="container">
          <header className="contact-header">
            <h2>GET IN TOUCH</h2>
          </header>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            Data kontak tidak tersedia
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section">
  <div className="container">
    <header className="contact-header">
      <h2>GET IN TOUCH</h2>
    </header>

    <div className="contact-grid">
      <figure className="contact-map">
            <iframe
              src={profileData.gmaps || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.7241609902394!2d115.06136577500862!3d-8.129540291900181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd19b007c2426d3%3A0xfcba4a551fcaefa3!2sJepun%20Bali%20Kencana!5e0!3m2!1sid!2sid!4v1765445590587!5m2!1sid!2sid"}
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
          <p>{profileData.phone}</p>
        </div>

        <address className="contact-address">
          <h3>Based in</h3>
          <p dangerouslySetInnerHTML={{ __html: profileData.address.replace(/\n/g, '<br />') }} />
        </address>

        <nav className="contact-socials" aria-label="Social media">
          {profileData.facebook && (
            <a href={profileData.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="/Facebook.svg" alt="Facebook" />
            </a>
          )}
          {profileData.whatsapp && (
            <a href={profileData.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <img src="/whatsapp.svg" alt="WhatsApp" />
            </a>
          )}
          {profileData.instagram && (
            <a href={profileData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="/Group.svg" alt="Instagram" />
            </a>
          )}
        </nav>

      </article>

    </div>
  </div>
</section>

  );
}
