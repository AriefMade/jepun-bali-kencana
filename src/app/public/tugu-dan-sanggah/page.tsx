'use client';
import { useState, useEffect } from 'react';
import './tugu-sanggah.css';

type Product = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  whatsapp: string | null;
  stock: number;
  image: string | null;
};

export default function TuguDanSanggahPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [profileData, setProfileData] = useState<{ whatsapp: string | null } | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?category=Candi');
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      const res = await fetch('/api/profile-data');
      const data = await res.json();
      
      if (data.success) {
        setProfileData(data.profileData);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openPopup = (product: Product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="tugu-sanggah-container">
        <h1 className="page-title">Tugu & Sanggah Kami</h1>
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          Memuat produk...
        </div>
      </div>
    );
  }

      if (!profileData) {
    return (
      <section id="contact" className="contact-section">
        <div className="container">
          <header className="contact-header">
            <h2>GET IN TOUCH</h2>
          </header>
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            Data kontak tidak tersedia
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="tugu-sanggah-container">
      <h1 className="page-title">Tugu & Sanggah Kami</h1>
      
      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          Belum ada produk tugu dan sanggah
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card" onClick={() => openPopup(product)}>
              <div className="product-image-wrapper">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image circular"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/400x400';
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: '80%', 
                    height: '90%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#E8E8E8',
                    color: '#9ca3af',
                    borderRadius: '50%'
                  }}>
                    No Image
                  </div>
                )}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-stock">Sisa {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <div className="popup-grid">
              <div className="popup-image-section">
                {selectedProduct.image ? (
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="popup-main-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/400x600';
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '400px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#E8E8E8',
                    color: '#9ca3af'
                  }}>
                    No Image
                  </div>
                )}
              </div>
              <div className="popup-details">
                <h2>{selectedProduct.name}</h2>
                <div className="popup-category">{selectedProduct.category}</div>
                <p className="popup-description">
                  {selectedProduct.description || 'Tidak ada deskripsi'}
                </p>
                <div className="popup-stock-info">
                  <span className="stock-label">Stok Tersedia:</span>
                  <span className="stock-value">{selectedProduct.stock} unit</span>
                </div>
                <div className="popup-actions">
                {profileData.whatsapp && (
                <a href={profileData.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <button className="contact-button">Pesan Sekarang</button>
                  </a>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}