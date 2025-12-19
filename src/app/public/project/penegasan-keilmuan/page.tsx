'use client'
import Link from 'next/link';
import { Compass, Leaf, Users, Recycle, ArrowRight } from 'lucide-react';
import './penegasan-keilmuan.css';

export default function PenegasanKeilmuan() {
  const designPrinciples = [
    {
      icon: <Compass size={32} />,
      title: 'Konteks Tapak',
      description: 'Setiap desain lahir dari pemahaman mendalam terhadap kondisi fisik, iklim mikro, dan karakteristik unik tapak.',
      details: [
        'Analisis topografi dan kontur eksisting',
        'Studi orientasi matahari dan arah angin',
        'Identifikasi view dan potensi visual',
        'Pemahaman drainase dan hidrologi'
      ]
    },
    {
      icon: <Users size={32} />,
      title: 'Fungsi Ruang Luar',
      description: 'Lanskap bukan sekadar estetika, tetapi ruang yang dirancang untuk mendukung aktivitas dan meningkatkan kualitas hidup.',
      details: [
        'Zoning berdasarkan kebutuhan pengguna',
        'Sirkulasi yang intuitif dan nyaman',
        'Ruang multifungsi yang fleksibel',
        'Skala manusia dalam desain'
      ]
    },
    {
      icon: <Recycle size={32} />,
      title: 'Keberlanjutan',
      description: 'Pendekatan ekologis yang mempertimbangkan dampak jangka panjang terhadap lingkungan dan sumber daya.',
      details: [
        'Pemilihan tanaman adaptif iklim lokal',
        'Sistem irigasi hemat air',
        'Material lokal dan berkelanjutan',
        'Desain yang mendukung biodiversitas'
      ]
    },
    {
      icon: <Leaf size={32} />,
      title: 'Budaya & Lokalitas',
      description: 'Integrasi nilai budaya dan kearifan lokal sebagai identitas dan jiwa dari setiap karya lanskap.',
      details: [
        'Interpretasi elemen tradisional Bali',
        'Penggunaan tanaman dalam konteks ritual',
        'Philosophy tri hita karana',
        'Harmoni dengan arsitektur lokal'
      ]
    }
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Analisis Tapak',
      description: 'Survey lapangan, pengukuran, dan analisis komprehensif kondisi tapak serta konteks lingkungan sekitar.'
    },
    {
      number: '02',
      title: 'Konsep Desain',
      description: 'Pengembangan ide berdasarkan analisis, kebutuhan klien, dan prinsip desain lanskap yang kontekstual.'
    },
    {
      number: '03',
      title: 'Pengembangan Desain',
      description: 'Detailing konsep menjadi gambar kerja teknis, pemilihan material, dan spesifikasi tanaman.'
    },
    {
      number: '04',
      title: 'Implementasi',
      description: 'Pelaksanaan konstruksi dengan supervisi langsung untuk memastikan kualitas dan akurasi desain.'
    },
    {
      number: '05',
      title: 'Evaluasi',
      description: 'Monitoring paska konstruksi, maintenance guidance, dan dokumentasi hasil akhir proyek.'
    }
  ];

  return (
    <div className="philosophy-wrapper">
      {/* Hero Section */}
      <section className="philosophy-hero">
        <div className="hero-container">
          <span className="hero-label">Pendekatan Desain</span>
          <h1 className="hero-title">
            Merancang Lanskap<br />
            sebagai Ruang Hidup
          </h1>
          <p className="hero-description">
            Kami tidak sekadar menata taman, tetapi merancang ruang luar sebagai ekosistem 
            yang fungsional, berkelanjutan, dan bermakna. Setiap proyek adalah dialog antara 
            arsitektur, alam, budaya, dan kebutuhan manusia.
          </p>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="philosophy-statement">
        <div className="statement-container">
          <p className="statement-text">
            Arsitektur lanskap adalah seni dan sains merancang lingkungan binaan yang harmonis 
            dengan alam. Kami memandang setiap tapak sebagai kanvas dengan potensi uniknya sendiri—
            sebuah kesempatan untuk menciptakan ruang yang tidak hanya indah dipandang, 
            tetapi juga meningkatkan kualitas hidup dan menghormati konteks budaya serta ekologi lokal.
          </p>
        </div>
      </section>

      {/* Design Principles */}
      <section className="principles-section">
        <div className="principles-container">
          <div className="section-header">
            <h2 className="section-title">Prinsip Desain Utama</h2>
            <p className="section-subtitle">
              Fondasi filosofis yang membimbing setiap keputusan desain kami
            </p>
          </div>

          <div className="principles-grid">
            {designPrinciples.map((principle, index) => (
              <div key={index} className="principle-card">
                <div className="principle-icon">{principle.icon}</div>
                <h3 className="principle-title">{principle.title}</h3>
                <p className="principle-description">{principle.description}</p>
                <ul className="principle-details">
                  {principle.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section">
        <div className="workflow-container">
          <div className="section-header">
            <h2 className="section-title">Alur Kerja Arsitektur Lanskap</h2>
            <p className="section-subtitle">
              Proses sistematis dari analisis hingga implementasi
            </p>
          </div>

          <div className="workflow-timeline">
            {workflowSteps.map((step, index) => (
              <div key={index} className="workflow-step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tropical Heritage Approach */}
      <section className="approach-section">
        <div className="approach-container">
          <div className="approach-content">
            <h2 className="approach-title">Pendekatan Tropis–Heritage</h2>
            <p className="approach-intro">
              Sebagai praktisi lanskap di Bali, kami mengembangkan pendekatan khusus yang 
              menggabungkan strategi desain tropis dengan sensitivitas terhadap warisan budaya lokal.
            </p>

            <div className="approach-aspects">
              <div className="aspect-item">
                <h3 className="aspect-title">Penyesuaian Iklim Tropis</h3>
                <p className="aspect-text">
                  Stratifikasi vegetasi untuk menciptakan naungan alami, pemilihan tanaman yang 
                  tahan panas dan kelembaban tinggi, serta desain yang memaksimalkan sirkulasi 
                  udara dan mengurangi heat island effect.
                </p>
              </div>

              <div className="aspect-item">
                <h3 className="aspect-title">Integrasi Elemen Tradisional</h3>
                <p className="aspect-text">
                  Penggunaan material lokal seperti batu alam dan kayu tropis, penempatan ornamen 
                  atau miniatur candi sebagai focal point spiritual, dan pemilihan tanaman yang 
                  memiliki nilai filosofis dalam budaya Bali.
                </p>
              </div>

              <div className="aspect-item">
                <h3 className="aspect-title">Interpretasi Modern</h3>
                <p className="aspect-text">
                  Menerjemahkan nilai tradisional ke dalam bahasa desain kontemporer—menciptakan 
                  lanskap yang tetap relevan dengan gaya hidup modern namun berakar pada kearifan lokal.
                </p>
              </div>
            </div>
          </div>

          <div className="approach-visual">
            <div className="visual-placeholder">
              <div className="visual-text">
                <Leaf size={48} />
                <p>Diagram Pendekatan Desain</p>
                <span>(Coming Soon)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="closing-section">
        <div className="closing-container">
          <blockquote className="closing-quote">
            "Lanskap yang baik bukan hanya tentang tanaman yang tepat di tempat yang tepat, 
            tetapi tentang menciptakan pengalaman ruang yang memperkaya kehidupan manusia 
            dan menghormati alam serta budaya tempat ia berada."
          </blockquote>
          <p className="closing-attribution">— Tim Jepun Bali Kencana</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="philosophy-cta">
        <div className="cta-content">
          <h2 className="cta-title">Mari Wujudkan Lanskap Impian Anda</h2>
          <p className="cta-text">
            Dengan pendekatan desain yang matang dan pengalaman dalam berbagai skala proyek, 
            kami siap menjadi partner Anda dalam menciptakan ruang luar yang bermakna.
          </p>
          <div className="cta-buttons">
            <Link href="/public/project/overview-karya" className="btn-portfolio">
              Lihat Portfolio
            </Link>
            <Link href="/public/sections/ContactSection" className="btn-contact">
              Konsultasi Gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}