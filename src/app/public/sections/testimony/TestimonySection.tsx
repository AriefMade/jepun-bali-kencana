'use client'
import TestimonialCard from './testimonialCard';
import '../../styles/testimony.css';
import { useState, useEffect } from 'react';

type Testimonial = {
  id: number;
  name: string;
  message: string;
  rating: number;
  category: string | null;
  avatar: string | null;
  date: Date;
};

export default function TestimonySection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      
      if (data.success) {
        setTestimonials(data.testimonials.slice(0, 28));
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="testimony" className="testimony-section">
      <div className="testimony-container">
        <div className="testimony-content">
          <header className="testimony-header">
            <h2 className="testimony-title">
              Experience the Craft of Nature
            </h2>
            <p className="testimony-description">
              Setiap karya kami lahir dari tangan berpengalaman dan dedikasi tinggi terhadap keindahan alami. Lihat apa yang pelanggan kami rasakan.
            </p>
          </header>

          <div className="testimony-cards-wrapper">
            <div className="testimony-cards-grid">
              {loading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                  Loading...
                </div>
              ) : testimonials.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: '#67646A' }}>
                  Belum ada testimoni
                </div>
              ) : (
                testimonials.map((item) => (
                  <TestimonialCard
                    key={item.id}
                    name={item.name}
                    message={item.message}
                    rating={item.rating}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
