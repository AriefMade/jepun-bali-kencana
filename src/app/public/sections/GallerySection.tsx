'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "../styles/gallery.module.css";

interface GalleryItem {
  id: number;
  image: string;
  date: string;
}

export default function GallerySection() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/galleries/public');
      const data = await res.json();
      
      if (data.success) {
        setGalleries(data.galleries.slice(0, 10)); //ambil 4
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="gallery" className={styles.gallerySection}>
        <header className={styles.header}>
          <h3 className={styles.title}>Gallery</h3>
        </header>
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#6b7280'
        }}>
          Loading gallery...
        </div>
      </section>
    );
  }

  if (galleries.length === 0) {
    return (
      <section id="gallery" className={styles.gallerySection}>
        <header className={styles.header}>
          <h3 className={styles.title}>Gallery</h3>
        </header>
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#6b7280'
        }}>
          Belum ada foto di galeri
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className={styles.gallerySection}>
      <header className={styles.header}>
        <h3 className={styles.title}>Gallery</h3>
        <a href="/admin/panel/gallery" className={styles.viewAll}>
          Lihat Semua
        </a>
      </header>

      <article className={styles.galleryGrid}>
        {galleries.map(item => (
          <figure key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={`Gallery ${formatDate(item.date)}`}
                fill
                className={styles.image}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <figcaption className={styles.caption}>
              {formatDate(item.date)}
            </figcaption>
          </figure>
        ))}
      </article>
    </section>
  );
}