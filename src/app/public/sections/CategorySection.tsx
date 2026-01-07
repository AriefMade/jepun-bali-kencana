import Link from 'next/link';
import Image from 'next/image';
import '@/src/app/public/styles/category.css';

export default function Category() {
  return (
    <section id="category" className="category-wrapper">
      <h2 className="category-title">Kategori Produk Kami</h2>
      
      <div className="category-grid">
        <Link href="/public/project/overview-karya" className="category-card large">
          <div className="category-content">
            <div className="category-text">
              Arsitektur<br/>Lanskap
            </div>
            <Image 
              src="/image 9.png" 
              alt="Arsitektur Lanskap"
              className="category-image"
              width={500}
              height={600}
            />
          </div>
        </Link>

        <Link href="/public/tanaman-hias" className="category-card top-right">
          <div className="category-content">
            <div className="category-text">
              Tanaman<br/>Hias
            </div>
            <Image 
              src="/image 10.png" 
              alt="Tanaman Hias"
              className="category-image"
              width={400}
              height={400}
            />
          </div>
        </Link>

        <Link href="/public/tugu-dan-sanggah" className="category-card bottom-right">
          <div className="category-content">
            <div className="category-text">
              Tugu &<br/>Sanggah
            </div>
            <Image 
              src="/image 11.png" 
              alt="Ornamen Candi"
              className="category-image"
              width={350}
              height={350}
            />
          </div>
        </Link>
      </div>
    </section>
  );
}