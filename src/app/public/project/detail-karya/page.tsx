'use client'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Maximize2, User } from 'lucide-react';
import './detail-karya.css';

type ProjectDetail = {
  slug: string;
  title: string;
  category: string;
  location: string;
  area: string;
  duration: string;
  year: string;
  clientType: string;
  budget?: string;
  
  // Content Sections
  heroImage: string;
  background: {
    initialCondition: string;
    mainChallenges: string[];
    clientNeeds: string[];
  };
  designApproach: {
    siteAnalysis: string;
    designConcept: string;
    zoning: string;
    plantSelection: string;
    culturalIntegration?: string;
  };
  process: {
    sketch?: string;
    construction: string[];
    planting: string;
  };
  gallery: {
    before: string[];
    during: string[];
    after: string[];
    details: string[];
  };
  results: {
    functionalBenefits: string[];
    aestheticValue: string;
    testimonial?: {
      name: string;
      role: string;
      message: string;
    };
  };
};

// Dummy Data - In real app, fetch from API/database based on slug
const projectsData: Record<string, ProjectDetail> = {
  'taman-privat-villa-sanur': {
    slug: 'taman-privat-villa-sanur',
    title: 'Taman Privat Villa Sanur',
    category: 'Taman Hunian',
    location: 'Sanur, Bali',
    area: '450 m²',
    duration: '3 bulan',
    year: '2024',
    clientType: 'Pribadi',
    budget: 'Rp 150-200 juta',
    
    heroImage: '/projects/villa-sanur-hero.jpg',
    
    background: {
      initialCondition: 'Lahan kosong dengan kontur datar, tanpa vegetasi eksisting. Area terbatas dengan eksposur matahari penuh sepanjang hari.',
      mainChallenges: [
        'Lahan sempit dengan dimensi memanjang (12m x 37.5m)',
        'Paparan sinar matahari langsung tanpa naungan',
        'Kebutuhan privasi dari tetangga sekitar',
        'Keinginan owner untuk area outdoor dining dan meditasi'
      ],
      clientNeeds: [
        'Taman tropis yang teduh dan asri',
        'Area duduk outdoor yang nyaman',
        'Sudut meditasi yang privat',
        'Low maintenance dengan sistem irigasi otomatis'
      ]
    },
    
    designApproach: {
      siteAnalysis: 'Analisis orientasi matahari, aliran air, dan view eksisting. Identifikasi zona-zona berdasarkan tingkat privasi dan fungsi.',
      designConcept: 'Konsep "Tropical Sanctuary" - menciptakan oasis tropis dengan stratifikasi vegetasi berlapis untuk menghasilkan naungan natural dan suasana tenang.',
      zoning: 'Pembagian zona: area welcome garden di depan, central garden dengan water feature, dining area dengan pergola, dan meditation corner di bagian belakang.',
      plantSelection: 'Kombinasi palma (Palem Putri, Palem Kuning), tanaman penutup tanah (Sansiviera, Lili Paris), dan tanaman struktural (Kamboja Jepang, Bambu Jepang) dengan aksen Bonsai Serut.',
      culturalIntegration: 'Integrasi elemen Bali melalui penggunaan batu alam lokal, miniatur candi sebagai focal point, dan philosophy tri hita karana dalam penataan ruang.'
    },
    
    process: {
      sketch: '/projects/villa-sanur-sketch.jpg',
      construction: [
        'Pembuatan hardscape: pathway dari batu alam, deck kayu untuk dining area',
        'Instalasi water feature dan sistem irigasi tetes',
        'Penanaman layer pertama: pohon peneduh dan palma',
        'Penanaman layer kedua: semak dan groundcover'
      ],
      planting: 'Penanaman dimulai dari tanaman besar ke kecil, dengan perhatian khusus pada komposisi warna dan tekstur. Penggunaan mulsa organik untuk retensi kelembaban.'
    },
    
    gallery: {
      before: ['/projects/villa-sanur-before-1.jpg', '/projects/villa-sanur-before-2.jpg'],
      during: ['/projects/villa-sanur-construction-1.jpg', '/projects/villa-sanur-construction-2.jpg'],
      after: [
        '/projects/villa-sanur-after-1.jpg',
        '/projects/villa-sanur-after-2.jpg',
        '/projects/villa-sanur-after-3.jpg',
        '/projects/villa-sanur-after-4.jpg'
      ],
      details: [
        '/projects/villa-sanur-detail-1.jpg',
        '/projects/villa-sanur-detail-2.jpg',
        '/projects/villa-sanur-detail-3.jpg'
      ]
    },
    
    results: {
      functionalBenefits: [
        'Penurunan suhu ambient area outdoor hingga 5-7°C',
        'Privasi visual terjaga dari 3 sisi',
        'Area outdoor dapat digunakan hingga sore hari',
        'Sistem irigasi otomatis mengurangi maintenance hingga 60%'
      ],
      aestheticValue: 'Taman menciptakan transisi seamless antara indoor-outdoor living, dengan komposisi visual yang dinamis namun harmonis. Penggunaan tanaman tropis menciptakan atmosfer resort dalam hunian pribadi.',
      testimonial: {
        name: 'Bapak Made Suteja',
        role: 'Pemilik Villa',
        message: 'Taman ini benar-benar mengubah kualitas hidup kami. Sekarang kami punya tempat favorit untuk sarapan dan yoga pagi. Desainnya natural tapi tetap rapi dan mudah dirawat.'
      }
    }
  },
  
  'lanskap-pura-dalem-pemaron': {
    slug: 'lanskap-pura-dalem-pemaron',
    title: 'Lanskap Pura Dalem Pemaron',
    category: 'Kawasan Suci',
    location: 'Buleleng, Bali',
    area: '800 m²',
    duration: '4 bulan',
    year: '2024',
    clientType: 'Institusi (Banjar Adat)',
    
    heroImage: '/projects/pura-dalem-hero.jpg',
    
    background: {
      initialCondition: 'Area pura dengan vegetasi minimal, dominasi rumput liar, dan belum adanya penataan lanskap yang terstruktur.',
      mainChallenges: [
        'Menjaga kesucian dan nilai spiritual kawasan',
        'Pemilihan tanaman yang sesuai aturan adat',
        'Integrasi dengan arsitektur pura eksisting',
        'Drainage yang buruk saat musim hujan'
      ],
      clientNeeds: [
        'Lanskap yang mendukung kekhusyukan beribadah',
        'Penataan yang sesuai lontar dan aturan adat',
        'Area teduh untuk upacara',
        'Jalur sirkulasi yang jelas untuk prosesi'
      ]
    },
    
    designApproach: {
      siteAnalysis: 'Studi orientasi spiritual (kaja-kelod, kangin-kauh), analisis pola upacara, dan konsultasi dengan sulinggih.',
      designConcept: 'Konsep "Sacred Garden" berdasarkan konsep taman suci tradisional Bali dengan hierarki ruang dari nista, madya, hingga utama.',
      zoning: 'Pembagian zona sesuai tri mandala: jaba (area luar), jaba tengah (area transisi), dan jeroan (area suci). Setiap zona memiliki karakter vegetasi berbeda.',
      plantSelection: 'Penggunaan tanaman suci: Sandat (Cempaka), Majegau, Nagasari, Cempaka Putih, dengan groundcover Rumput Gajah Mini. Tanaman dipilih berdasarkan usadha dan lontar.',
      culturalIntegration: 'Penempatan tanaman mengikuti filosofi dewata nawa sanga, integrasi dengan batu penyengker tradisional, dan penambahan miniatur candi sebagai penanda axis spiritual.'
    },
    
    process: {
      construction: [
        'Perbaikan sistem drainage dan kontur tanah',
        'Pembuatan jalur setapak dari batu alam dengan pola tradisional',
        'Instalasi lampu taman dengan sensitif terhadap konteks sakral',
        'Penanaman bertahap dengan upacara nangluk merana'
      ],
      planting: 'Proses penanaman dilakukan dengan upacara adat, dimulai dari area utama (jeroan) kemudian ke madya dan nista. Setiap tanaman suci ditempatkan sesuai arah mata angin.'
    },
    
    gallery: {
      before: ['/projects/pura-dalem-before-1.jpg', '/projects/pura-dalem-before-2.jpg'],
      during: ['/projects/pura-dalem-construction-1.jpg'],
      after: [
        '/projects/pura-dalem-after-1.jpg',
        '/projects/pura-dalem-after-2.jpg',
        '/projects/pura-dalem-after-3.jpg'
      ],
      details: ['/projects/pura-dalem-detail-1.jpg', '/projects/pura-dalem-detail-2.jpg']
    },
    
    results: {
      functionalBenefits: [
        'Jalur prosesi yang jelas dan nyaman',
        'Area teduh untuk upacara hingga 200 orang',
        'Drainage yang baik mencegah genangan air',
        'Suasana sejuk mendukung kekhusyukan'
      ],
      aestheticValue: 'Lanskap menciptakan transisi spiritual dari dunia profan ke sakral melalui stratifikasi vegetasi dan penggunaan material lokal. Keseimbangan antara kesederhanaan dan kesakralan tercapai.',
      testimonial: {
        name: 'I Wayan Eka Putra',
        role: 'Bendesa Adat',
        message: 'Penataan lanskapnya sangat sesuai dengan lontar dan tidak mengurangi nilai kesucian pura. Bahkan menambah kekhusyukan saat upacara. Terima kasih sudah memahami konteks budaya kami.'
      }
    }
  }
};

export default function DetailKarya() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Proyek tidak ditemukan</h1>
        <Link href="/public/project/overview-karya">Kembali ke Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="detail-wrapper">
      {/* Back Button */}
      <Link href="/public/project/overview-karya" className="back-button">
        <ArrowLeft size={20} />
        <span>Kembali ke Portfolio</span>
      </Link>

      {/* Hero Section */}
      <section className="detail-hero">
        <div className="hero-image-container">
          <img src={project.heroImage} alt={project.title} className="hero-image" />
          <div className="hero-overlay">
            <div className="hero-text">
              <span className="hero-category">{project.category}</span>
              <h1 className="hero-title">{project.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Bar */}
      <section className="project-info-bar">
        <div className="info-container">
          <div className="info-item">
            <User size={18} />
            <div>
              <span className="info-label">Klien</span>
              <span className="info-value">{project.clientType}</span>
            </div>
          </div>
          <div className="info-item">
            <MapPin size={18} />
            <div>
              <span className="info-label">Lokasi</span>
              <span className="info-value">{project.location}</span>
            </div>
          </div>
          <div className="info-item">
            <Maximize2 size={18} />
            <div>
              <span className="info-label">Luas Area</span>
              <span className="info-value">{project.area}</span>
            </div>
          </div>
          <div className="info-item">
            <Calendar size={18} />
            <div>
              <span className="info-label">Durasi</span>
              <span className="info-value">{project.duration}</span>
            </div>
          </div>
          <div className="info-item">
            <Calendar size={18} />
            <div>
              <span className="info-label">Tahun</span>
              <span className="info-value">{project.year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="detail-content">
        {/* Background & Challenge */}
        <section className="content-section">
          <h2 className="section-title">Latar Belakang & Tantangan</h2>
          
          <div className="subsection">
            <h3 className="subsection-title">Kondisi Awal Tapak</h3>
            <p className="text-content">{project.background.initialCondition}</p>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Permasalahan Utama</h3>
            <ul className="list-content">
              {project.background.mainChallenges.map((challenge, idx) => (
                <li key={idx}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Kebutuhan Klien</h3>
            <ul className="list-content">
              {project.background.clientNeeds.map((need, idx) => (
                <li key={idx}>{need}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Design Approach */}
        <section className="content-section bg-light">
          <h2 className="section-title">Pendekatan Desain Lanskap</h2>

          <div className="design-grid">
            <div className="design-item">
              <h3 className="design-item-title">Analisis Tapak</h3>
              <p className="text-content">{project.designApproach.siteAnalysis}</p>
            </div>

            <div className="design-item">
              <h3 className="design-item-title">Konsep Desain</h3>
              <p className="text-content">{project.designApproach.designConcept}</p>
            </div>

            <div className="design-item">
              <h3 className="design-item-title">Strategi Zoning</h3>
              <p className="text-content">{project.designApproach.zoning}</p>
            </div>

            <div className="design-item">
              <h3 className="design-item-title">Pemilihan Tanaman</h3>
              <p className="text-content">{project.designApproach.plantSelection}</p>
            </div>

            {project.designApproach.culturalIntegration && (
              <div className="design-item full-width">
                <h3 className="design-item-title">Integrasi Unsur Budaya</h3>
                <p className="text-content">{project.designApproach.culturalIntegration}</p>
              </div>
            )}
          </div>
        </section>

        {/* Process */}
        <section className="content-section">
          <h2 className="section-title">Proses Pengerjaan</h2>

          {project.process.sketch && (
            <div className="process-sketch">
              <img src={project.process.sketch} alt="Design Sketch" />
              <p className="image-caption">Sketsa konsep desain awal</p>
            </div>
          )}

          <div className="subsection">
            <h3 className="subsection-title">Tahapan Konstruksi</h3>
            <ul className="list-content timeline">
              {project.process.construction.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Penanaman & Finishing</h3>
            <p className="text-content">{project.process.planting}</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="content-section gallery-section">
          <h2 className="section-title">Dokumentasi Visual</h2>

          {project.gallery.before.length > 0 && (
            <div className="gallery-group">
              <h3 className="gallery-group-title">Kondisi Awal (Before)</h3>
              <div className="gallery-grid">
                {project.gallery.before.map((img, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={img} alt={`Before ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.gallery.during.length > 0 && (
            <div className="gallery-group">
              <h3 className="gallery-group-title">Proses Pengerjaan</h3>
              <div className="gallery-grid">
                {project.gallery.during.map((img, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={img} alt={`During ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="gallery-group">
            <h3 className="gallery-group-title">Hasil Akhir (After)</h3>
            <div className="gallery-grid">
              {project.gallery.after.map((img, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={img} alt={`After ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {project.gallery.details.length > 0 && (
            <div className="gallery-group">
              <h3 className="gallery-group-title">Detail Elemen Lanskap</h3>
              <div className="gallery-grid">
                {project.gallery.details.map((img, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={img} alt={`Detail ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Results & Impact */}
        <section className="content-section bg-light">
          <h2 className="section-title">Hasil & Dampak</h2>

          <div className="subsection">
            <h3 className="subsection-title">Manfaat Fungsional</h3>
            <ul className="list-content">
              {project.results.functionalBenefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Nilai Estetika</h3>
            <p className="text-content">{project.results.aestheticValue}</p>
          </div>

          {project.results.testimonial && (
            <div className="testimonial-box">
              <div className="quote-mark">"</div>
              <p className="testimonial-message">{project.results.testimonial.message}</p>
              <div className="testimonial-author">
                <p className="author-name">{project.results.testimonial.name}</p>
                <p className="author-role">{project.results.testimonial.role}</p>
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="content-section cta-section">
          <h2 className="cta-title">Tertarik dengan Pendekatan Kami?</h2>
          <p className="cta-text">Mari diskusikan proyek lanskap Anda dan bagaimana kami dapat mewujudkannya.</p>
          <div className="cta-buttons">
            <Link href="/public/sections/ContactSection" className="btn-primary">
              Konsultasi Proyek
            </Link>
            <Link href="/public/project/overview-karya" className="btn-secondary">
              Lihat Portfolio Lainnya
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}