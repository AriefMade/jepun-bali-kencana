'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './overview-karya.css';

type Project = {
  id: number;
  slug: string;
  title: string;
  location: string;
  category: string;
  area: string;
  year: string;
  thumbnailImage: string;
  beforeImage?: string;
  isFeatured: boolean;
};

const categories = [
  { id: 'all', label: 'Semua Proyek' },
  { id: 'Taman Hunian', label: 'Taman Hunian' },
  { id: 'Ruang Publik', label: 'Ruang Publik' },
  { id: 'Komersial', label: 'Area Komersial' },
  { id: 'Kawasan Suci', label: 'Lanskap Kawasan Suci' },
];

export default function OverviewKarya() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showBeforeAfter, setShowBeforeAfter] = useState<number | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  const fetchProjects = async () => {
    try {
      const url = activeCategory === 'all' 
        ? '/api/projects?published=true' 
        : `/api/projects?category=${activeCategory}&published=true`;
      
      const res = await fetch(url);
      const data = await res.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="portfolio-wrapper">
        <div className="loading-state">
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-wrapper">
      <section className="portfolio-hero">
        <div className="hero-content">
          <h1 className="hero-title">Portfolio Arsitektur Lanskap</h1>
          <p className="hero-subtitle">
            Eksplorasi karya-karya kami dalam merancang ruang luar yang fungsional, 
            estetis, dan kontekstual terhadap budaya serta lingkungan tropis Bali.
          </p>
        </div>
      </section>

      <section className="portfolio-filter">
        <div className="filter-container">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="portfolio-grid">
        <div className="grid-container">
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>Belum ada project di kategori ini</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project-card">
                <Link href={`/public/project/${project.slug}`} className="project-link">
                  <div 
                    className="project-image"
                    onMouseEnter={() => project.beforeImage && setShowBeforeAfter(project.id)}
                    onMouseLeave={() => setShowBeforeAfter(null)}
                  >
                    <img 
                      src={
                        showBeforeAfter === project.id && project.beforeImage 
                          ? project.beforeImage 
                          : project.thumbnailImage
                      } 
                      alt={project.title}
                    />
                    {project.beforeImage && (
                      <div className="before-after-badge">
                        {showBeforeAfter === project.id ? 'Before' : 'After'}
                      </div>
                    )}
                    {project.isFeatured && (
                      <div className="featured-badge">★ Featured</div>
                    )}
                    <div className="project-overlay">
                      <span className="view-project">Lihat Detail Proyek</span>
                    </div>
                  </div>

                  <div className="project-info">
                    <div className="project-category">{project.category}</div>
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-meta">
                      <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {project.location}
                      </span>
                      <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <path d="M9 3v18M15 3v18"/>
                        </svg>
                        {project.area}
                      </span>
                      <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="portfolio-cta">
        <div className="cta-content">
          <h2>Tertarik dengan Pendekatan Desain Kami?</h2>
          <p>Mari diskusikan bagaimana kami dapat merancang ruang luar yang sesuai dengan visi dan kebutuhan Anda.</p>
          <div className="cta-buttons">
            <Link href="/public/project/penegasan-keilmuan" className="cta-button-outline">
              Pelajari Pendekatan Kami
            </Link>
            <Link href="/#contact" className="cta-button">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}