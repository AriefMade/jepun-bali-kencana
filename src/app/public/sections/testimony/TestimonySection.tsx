import TestimonialCard from './testimonialCard';
import '../../styles/testimony.css';

const data = [
  { id: 1, name: "Ayu", message: "Tanaman bagus, rapi, natural!" },
  { id: 2, name: "Made", message: "Layanannya ramah dan detail." },
  { id: 3, name: "Wayan", message: "Hasilnya sesuai harapan!" },
  { id: 4, name: "Komang", message: "Pengerjaan cepat dan bersih." }
];

export default function TestimonySection() {
  return (
    <section className="testimony-section">
      <div className="testimony-container">
        <div className="testimony-content">
          <header className="testimony-header">
            <h2 className="testimony-title">
              Experience the Craft of Nature
            </h2>
            <p className="testimony-description">
              Setiap karya kami lahir dari tangan berpengalaman dan dedikasi tinggi terhadap keindahan alami. Lihat apa yang pelanggan kami rasakan.
            </p>
            <button className="testimony-button">
              Lihat Semua →
            </button>
          </header>

          <div className="testimony-cards-wrapper">
            <div className="testimony-cards-grid">
              {data.map((item) => (
                <TestimonialCard
                  key={item.id}
                  name={item.name}
                  message={item.message}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
