'use client';
import Image from "next/image";
import styles from "../styles/gallery.module.css";

interface GalleryItem {
  id: number;
  image: string;
  date: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    image: "/Rectangle 211.png",
    date: "06 September 2025"
  },
  {
    id: 2,
    image: "/Rectangle 211.png",
    date: "07 September 2025"
  },
  {
    id: 3,
    image: "/Rectangle 211.png",
    date: "08 September 2025"
  },
  {
    id: 4,
    image: "/Rectangle 211.png",
    date: "09 September 2025"
  },
];
export default function GallerySection() {
  return (
    <section className={styles.gallerySection}>
      <header className={styles.header}>
        <h2 className={styles.title}>Gallery</h2>
        <a className={styles.viewAll}>Lihat Semua</a>
      </header>

      <article className={styles.galleryGrid}>
        {galleryData.map(item => (
          <figure key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={`Gallery Image ${item.id}`}
                fill
                className={styles.image}
              />
            </div>

            <figcaption className={styles.caption}>
              {item.date}
            </figcaption>
          </figure>
        ))}
      </article>
    </section>
  );
}

