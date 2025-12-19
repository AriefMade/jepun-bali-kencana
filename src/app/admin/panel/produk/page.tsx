'use client'
import './produk.css';
import { Plus, Search, Filter, Edit2, Trash2, X, Upload } from 'lucide-react';
import { useState } from 'react';


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
    name: 'Bonsai Serut', 
    description: 'Bonsai serut berkualitas tinggi dengan bentuk artistik', 
    category: 'Tanaman', 
    stock: 8, 
    image: '/products/bonsai.jpg' 
  },
  { 
    id: 3, 
    name: 'Candi Miniatur Prambanan', 
    description: 'Replika candi Prambanan handmade detail tinggi', 
    category: 'Candi', 
    stock: 5, 
    image: '/products/candi-prambanan.jpg' 
  },
  { 
    id: 4, 
    name: 'Pohon Palem Mini', 
    description: 'Palem miniatur dalam pot keramik eksklusif', 
    category: 'Tanaman', 
    stock: 12, 
    image: '/products/palem.jpg' 
  },
  { 
    id: 5, 
    name: 'Relief Ukir Bali', 
    description: 'Relief ukiran bali tradisional motif bunga', 
    category: 'Candi', 
    stock: 3, 
    image: '/products/relief.jpg' 
  },
  { 
    id: 6, 
    name: 'Kaktus Collection Set', 
    description: 'Set 5 kaktus berbagai jenis dalam pot mini', 
    category: 'Tanaman', 
    stock: 20, 
    image: '/products/kaktus.jpg' 
  },
  { 
    id: 7, 
    name: 'Tanaman Sukulen Mix', 
    description: 'Kombinasi sukulen warna-warni dalam pot keramik', 
    category: 'Tanaman', 
    stock: 18, 
    image: '/products/sukulen.jpg' 
  },
  { 
    id: 8, 
    name: 'Candi Borobudur Mini', 
    description: 'Miniatur candi Borobudur dengan detail sempurna', 
    category: 'Candi', 
    stock: 7, 
    image: '/products/borobudur.jpg' 
  },
  { 
    id: 9, 
    name: 'Sansevieria Cylindrica', 
    description: 'Tanaman hias lidah mertua berbentuk silinder unik', 
    category: 'Tanaman', 
    stock: 25, 
    image: '/products/sansevieria.jpg' 
  },
  { 
    id: 10, 
    name: 'Patung Ganesha Stone', 
    description: 'Patung Ganesha dari batu alam finishing halus', 
    category: 'Candi', 
    stock: 4, 
    image: '/products/ganesha.jpg' 
  },
];

export default function produkPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');


  return (
    <div className="produk-container">
      <div className="page-header">
        <h1 className="page-title"> List Produk</h1>
        <p className="page-subtitle">Kelola semua produk Jepun Bali Kencana</p>
      </div>

      <div className="action-bar">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Cari produk..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button className={`filter-btn ${filterCategory === 'Semua' ? 'active' : ''}`} onClick={() => setFilterCategory('Semua')}>
            Semua
          </button>
          <button className={`filter-btn ${filterCategory === 'Tanaman' ? 'active' : ''}`} onClick={() => setFilterCategory('Tanaman')}>
            Tanaman
          </button>
          <button className={`filter-btn ${filterCategory === 'Candi' ? 'active' : ''}`} onClick={() => setFilterCategory('Candi')}>
            Candi
          </button>
        </div>

        <button className="btn-add" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="placeholder-image">
                  <Upload size={32} />
                  <p>No Image</p>
                </div>
              )}
            </div>

            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>

              <div className="product-meta">
                <span className="product-category">{product.category}</span>
                <span className="product-stock">Stok: {product.stock}</span>
              </div>

              <div className="product-actions">
                <button 
                  className="btn-edit"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowEditModal(true);
                  }}
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(showAddModal || showEditModal) && (
        <div className="modal-overlay" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{showAddModal ? 'Tambah Produk Baru' : 'Edit Produk'}</h2>
              <button className="btn-close" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form">
              <div className="form-group">
                <label>Upload Gambar</label>
                <div className="upload-area">
                  <Upload size={32} />
                  <p>Klik atau drag gambar di sini</p>
                  <input type="file" accept="image/*" />
                </div>
              </div>

              <div className="form-group">
                <label>Nama Produk</label>
                <input type="text" placeholder="Masukkan nama produk" defaultValue={selectedProduct?.name} />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea placeholder="Masukkan deskripsi produk" defaultValue={selectedProduct?.description} rows={3} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select defaultValue={selectedProduct?.category}>
                    <option>Tanaman</option>
                    <option>Candi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Stok</label>
                  <input type="number" placeholder="0" defaultValue={selectedProduct?.stock} />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  {showAddModal ? 'Tambah Produk' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon">
              <Trash2 size={48} />
            </div>
            <h2>Hapus Produk?</h2>
            <p>Apakah Anda yakin ingin menghapus <strong>{selectedProduct?.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                Batal
              </button>
              <button className="btn-delete-confirm">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}