'use client';
import { useState } from 'react';
import './tugu-sanggah.css';

type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  stock: number;
  image: string;
};

const products: Product[] = [
  { 
    id: 1, 
    name: 'Tugu Pura Tradisional', 
    description: 'Tugu pura dengan ukiran khas Bali yang indah dan detail', 
    category: 'Tugu', 
    stock: 5, 
    image: '/products/tugu1.jpg' 
  },
  { 
    id: 2, 
    name: 'Sanggah Kemulan', 
    description: 'Sanggah kemulan premium dengan ukiran naga dan ornamen tradisional', 
    category: 'Sanggah', 
    stock: 8, 
    image: '/products/sanggah1.jpg' 
  },
  { 
    id: 3, 
    name: 'Patung Dewa Siwa', 
    description: 'Patung dewa siwa dari batu paras berkualitas tinggi', 
    category: 'Patung', 
    stock: 3, 
    image: '/products/patung1.jpg' 
  },
  { 
    id: 4, 
    name: 'Meru Tumpang Tiga', 
    description: 'Meru tumpang tiga untuk pelangkiran dengan detail sempurna', 
    category: 'Meru', 
    stock: 4, 
    image: '/products/meru1.jpg' 
  },
];

export default function TuguDanSanggahPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openPopup = (product: Product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="tugu-sanggah-container">
      <h1 className="page-title">Tugu & Sanggah Kami</h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => openPopup(product)}>
            <div className="product-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image circular"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x400';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-stock">Sisa {product.stock}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <div className="popup-grid">
              <div className="popup-image-section">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="popup-main-image"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/400x600';
                  }}
                />
              </div>
              <div className="popup-details">
                <h2>{selectedProduct.name}</h2>
                <p className="popup-category">{selectedProduct.category}</p>
                <p className="popup-description">{selectedProduct.description}</p>
                <div className="popup-stock-info">
                  <span className="stock-label">Stok Tersedia:</span>
                  <span className="stock-value">{selectedProduct.stock} unit</span>
                </div>
                <div className="popup-actions">
                  <button className="contact-button primary">Pesan Sekarang</button>
                  <button className="contact-button secondary">Tanya Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}