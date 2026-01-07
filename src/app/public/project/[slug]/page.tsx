'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Maximize2, User, Loader2 } from 'lucide-react';
import './detail-karya.css';

type ProjectDetail = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  area: string;
  duration: string;
  year: string;
  clientType: string;
  budget?: string;
  

  heroImage: string;
  thumbnailImage: string;
  beforeImage?: string;
  sketchImage?: string;
  

  initialCondition: string;
  mainChallenges: string[];
  clientNeeds: string[];
  siteAnalysis: string;
  designConcept: string;
  zoning: string;
  plantSelection: string;
  culturalIntegration?: string;
  constructionSteps: string[];
  plantingProcess: string;
  functionalBenefits: string[];
  aestheticValue: string;
  

  testimonialName?: string;
  testimonialRole?: string;
  testimonialMessage?: string;
  
  images: {
    id: number;
    imageUrl: string;
    imageType: string;
    caption?: string;
  }[];
};

export default function DetailKarya() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchProject = async () => {
    try {
      console.log('Fetching slug:', slug); 
      const res = await fetch(`/api/projects/${slug}`);
      
      console.log('Response status:', res.status); 
      
      if (!res.ok) {
        throw new Error('Project tidak ditemukan');
      }

      const data = await res.json();
      console.log('Project data:', data); 
      setProject(data.project);
    } catch (err: any) {
      console.error('Fetch error:', err); 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner-wrapper">
            <Loader2 size={56} className="spinner" />
          </div>
          <h2 className="loading-title">Memuat Proyek</h2>
          <p className="loading-text">Mohon tunggu sebentar...</p>
          <div className="loading-bar">
            <div className="loading-bar-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-not-found">
        <h1>Project tidak ditemukan</h1>
        <p>{error}</p>
        <Link href="/public/project/overview-karya">Kembali ke Portfolio</Link>
      </div>
    );
  }


  const beforeImages = project.images.filter(img => img.imageType === 'before');
  const duringImages = project.images.filter(img => img.imageType === 'during');
  const afterImages = project.images.filter(img => img.imageType === 'after');
  const detailImages = project.images.filter(img => img.imageType === 'detail');

  return (
    <div className="detail-wrapper">
      <Link href="/public/project/overview-karya" className="back-button">
        <ArrowLeft size={20} />
        <span>Kembali ke Portfolio</span>
      </Link>

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

      <div className="detail-content">
        <section className="content-section">
          <h2 className="section-title">Latar Belakang & Tantangan</h2>
          
          <div className="subsection">
            <h3 className="subsection-title">Kondisi Awal Tapak</h3>
            <p className="text-content">{project.initialCondition}</p>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Permasalahan Utama</h3>
            <ul className="list-content">
              {project.mainChallenges.map((challenge, idx) => (
                <li key={idx}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Kebutuhan Klien</h3>
            <ul className="list-content">
              {project.clientNeeds.map((need, idx) => (
                <li key={idx}>{need}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="content-section bg-light">
          <h2 className="section-title">Pendekatan Desain Lanskap</h2>

          <div className="design-grid">
            <div className="design-item">
              <h3 className="design-item-title">Analisis Tapak</h3>
              <p className="text-content">{project.siteAnalysis}</p>
            </div>

            <div className="design-item">
              <h3 className="design-item-title">Konsep Desain</h3>
              <p className="text-content">{project.designConcept}</p>
            </div>

            <div className="design-item">
              <h3 className="design-item-title">Strategi Zoning</h3>
              <p className="text-content">{project.zoning}</p>
            </div>

            <div className="design-item">
              <h3 className="design-item-title">Pemilihan Tanaman</h3>
              <p className="text-content">{project.plantSelection}</p>
            </div>

            {project.culturalIntegration && (
              <div className="design-item full-width">
                <h3 className="design-item-title">Integrasi Unsur Budaya</h3>
                <p className="text-content">{project.culturalIntegration}</p>
              </div>
            )}
          </div>
        </section>

        <section className="content-section">
          <h2 className="section-title">Proses Pengerjaan</h2>

          {project.sketchImage && (
            <div className="process-sketch">
              <img src={project.sketchImage} alt="Design Sketch" />
              <p className="image-caption">Sketsa konsep desain awal</p>
            </div>
          )}

          <div className="subsection">
            <h3 className="subsection-title">Tahapan Konstruksi</h3>
            <ul className="list-content timeline">
              {project.constructionSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Penanaman & Finishing</h3>
            <p className="text-content">{project.plantingProcess}</p>
          </div>
        </section>

        <section className="content-section gallery-section">
          <h2 className="section-title">Dokumentasi Visual</h2>

          {beforeImages.length > 0 && (
            <div className="gallery-group">
              <h3 className="gallery-group-title">Kondisi Awal (Before)</h3>
              <div className="gallery-grid">
                {beforeImages.map((img) => (
                  <div key={img.id} className="gallery-item">
                    <img src={img.imageUrl} alt={img.caption || 'Before'} />
                    {img.caption && <p className="image-caption">{img.caption}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {duringImages.length > 0 && (
            <div className="gallery-group">
              <h3 className="gallery-group-title">Proses Pengerjaan</h3>
              <div className="gallery-grid">
                {duringImages.map((img) => (
                  <div key={img.id} className="gallery-item">
                    <img src={img.imageUrl} alt={img.caption || 'During'} />
                    {img.caption && <p className="image-caption">{img.caption}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {afterImages.length > 0 && (
            <div className="gallery-group">
              <h3 className="gallery-group-title">Hasil Akhir (After)</h3>
              <div className="gallery-grid">
                {afterImages.map((img) => (
                  <div key={img.id} className="gallery-item">
                    <img src={img.imageUrl} alt={img.caption || 'After'} />
                    {img.caption && <p className="image-caption">{img.caption}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailImages.length > 0 && (
            <div className="gallery-group">
              <h3 className="gallery-group-title">Detail Elemen Lanskap</h3>
              <div className="gallery-grid">
                {detailImages.map((img) => (
                  <div key={img.id} className="gallery-item">
                    <img src={img.imageUrl} alt={img.caption || 'Detail'} />
                    {img.caption && <p className="image-caption">{img.caption}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="content-section bg-light">
          <h2 className="section-title">Hasil & Dampak</h2>

          <div className="subsection">
            <h3 className="subsection-title">Manfaat Fungsional</h3>
            <ul className="list-content">
              {project.functionalBenefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Nilai Estetika</h3>
            <p className="text-content">{project.aestheticValue}</p>
          </div>

          {project.testimonialMessage && (
            <div className="testimonial-box">
              <div className="quote-mark">"</div>
              <p className="testimonial-message">{project.testimonialMessage}</p>
              <div className="testimonial-author">
                <p className="author-name">{project.testimonialName}</p>
                <p className="author-role">{project.testimonialRole}</p>
              </div>
            </div>
          )}
        </section>

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