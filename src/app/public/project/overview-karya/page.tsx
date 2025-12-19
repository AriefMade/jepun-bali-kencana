'use client'
import { useState } from 'react';
import Link from 'next/link';
import './overview-karya.css';

type Project = {
  id: string;
  title: string;
  location: string;
  category: string;
  area: string;
  year: string;
  thumbnail: string;
  beforeImage?: string;
  slug: string;
};

const projects: Project[] = [
  {
    id: '1',
    title: 'Taman Privat Villa Sanur',
    location: 'Sanur, Bali',
    category: 'Taman Hunian',
    area: '450 m²',
    year: '2024',
    thumbnail: '/projects/villa-sanur.jpg',
    beforeImage: '/projects/villa-sanur-before.jpg',
    slug: 'taman-privat-villa-sanur'
  },
  {
    id: '2',
    title: 'Lanskap Pura Dalem Pemaron',
    location: 'Buleleng, Bali',
    category: 'Kawasan Suci',
    area: '800 m²',
    year: '2024',
    thumbnail: '/projects/pura-dalem.jpg',
    slug: 'lanskap-pura-dalem-pemaron'
  },
  {
    id: '3',
    title: 'Hotel Boutique Ubud - Tropical Garden',
    location: 'Ubud, Bali',
    category: 'Komersial',
    area: '1200 m²',
    year: '2023',
    thumbnail: '/projects/hotel-ubud.jpg',
    beforeImage: '/projects/hotel-ubud-before.jpg',
    slug: 'hotel-boutique-ubud-tropical-garden'
  },
  {
    id: '4',
    title: 'Taman Kota Singaraja Heritage Park',
    location: 'Singaraja, Bali',
    category: 'Ruang Publik',
    area: '2500 m²',
    year: '2023',
    thumbnail: '/projects/heritage-park.jpg',
    slug: 'taman-kota-singaraja-heritage-park'
  },
  {
    id: '5',
    title: 'Restoran Tepi Pantai Lovina',
    location: 'Lovina, Bali',
    category: 'Komersial',
    area: '600 m²',
    year: '2024',
    thumbnail: '/projects/restoran-lovina.jpg',
    beforeImage: '/projects/restoran-lovina-before.jpg',
    slug: 'restoran-tepi-pantai-lovina'
  },
  {
    id: '6',
    title: 'Taman Tropis Rumah Cluster',
    location: 'Denpasar, Bali',
    category: 'Taman Hunian',
    area: '350 m²',
    year: '2023',
    thumbnail: '/projects/cluster-denpasar.jpg',
    slug: 'taman-tropis-rumah-cluster'
  },
];

const categories = [
  { id: 'all', label: 'Semua Proyek' },
  { id: 'Taman Hunian', label: 'Taman Hunian' },
  { id: 'Ruang Publik', label: 'Ruang Publik' },
  { id: 'Komersial', label: 'Area Komersial' },
  { id: 'Kawasan Suci', label: 'Lanskap Kawasan Suci' },
];

export default function OverviewKarya() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showBeforeAfter, setShowBeforeAfter] = useState<string | null>(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="portfolio-wrapper">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="hero-content">
          <h1 className="hero-title">Portfolio Arsitektur Lanskap</h1>
          <p className="hero-subtitle">
            Eksplorasi karya-karya kami dalam merancang ruang luar yang fungsional, 
            estetis, dan kontekstual terhadap budaya serta lingkungan tropis Bali.
          </p>
        </div>
      </section>

      {/* Filter Section */}
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

      {/* Projects Grid */}
      <section className="portfolio-grid">
        <div className="grid-container">
          {filteredProjects.map((project) => (
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
                        : project.thumbnail
                    } 
                    alt={project.title}
                  />
                  {project.beforeImage && (
                    <div className="before-after-badge">
                      {showBeforeAfter === project.id ? 'Before' : 'After'}
                    </div>
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
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta">
        <div className="cta-content">
          <h2>Tertarik dengan Pendekatan Desain Kami?</h2>
          <p>Mari diskusikan bagaimana kami dapat merancang ruang luar yang sesuai dengan visi dan kebutuhan Anda.</p>
          <Link href="/public/sections/ContactSection" className="cta-button">
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}