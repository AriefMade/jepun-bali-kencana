'use client';
import { useState } from 'react';
import './tanaman-hias.css';

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
    name: 'Adenium Arabicum', 
    description: 'Tanaman kamboja jepang premium dengan bunga pink cerah', 
    category: 'Tanaman', 
    stock: 15, 
    image: '/products/adenium.jpg' 
  },
  { 
    id: 2, 
    name: 'Bougainvillea', 
    description: 'Tanaman bunga kertas dengan warna-warni cerah', 
    category: 'Tanaman', 
    stock: 25, 
    image: '/products/bougainvillea.jpg' 
  },
  { 
    id: 3, 
    name: 'Frangipani', 
    description: 'Kamboja Bali asli dengan aroma harum', 
    category: 'Tanaman', 
    stock: 18, 
    image: '/products/frangipani.jpg' 
  },
  { 
    id: 4, 
    name: 'Plumeria', 
    description: 'Tanaman hias tropis eksotis', 
    category: 'Tanaman', 
    stock: 12, 
    image: '/products/plumeria.jpg' 
  },
];

export default function TanamanHiasPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openPopup = (product: Product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="tanaman-hias-container">
      <h1 className="page-title">Tanaman Hias Kami</h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => openPopup(product)}>
            <div className="product-image-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/252x416';
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
                <button className="contact-button">Hubungi Kami</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}