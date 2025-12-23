'use client'
import './produk.css';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  stock: number;
  image: string | null;
};

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Tanaman',
    stock: 0,
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filterCategory]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = filterCategory === 'Semua' 
        ? '/api/products' 
        : `/api/products?category=${filterCategory}`;
      
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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

  const handleAdd = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Tanaman',
      stock: 0,
      image: ''
    });
    setShowAddModal(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category,
      stock: product.stock,
      image: product.image || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        fetchProducts();
        setShowAddModal(false);
        alert('Produk berhasil ditambahkan!');
      } else {
        alert(data.error || 'Gagal menambah produk');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Terjadi kesalahan saat menambah produk');
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        fetchProducts();
        setShowEditModal(false);
        alert('Produk berhasil diupdate!');
      } else {
        alert(data.error || 'Gagal update produk');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Terjadi kesalahan saat update produk');
    }
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        fetchProducts();
        setShowDeleteModal(false);
        alert('Produk berhasil dihapus!');
      } else {
        alert(data.error || 'Gagal menghapus produk');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Terjadi kesalahan saat menghapus produk');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="produk-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="produk-container">
      <div className="page-header">
        <h1 className="page-title">Produk</h1>
        <p className="page-subtitle">Kelola semua produk tanaman dan candi Anda</p>
      </div>

      <div className="action-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <button 
            className={`filter-btn ${filterCategory === 'Semua' ? 'active' : ''}`}
            onClick={() => setFilterCategory('Semua')}
          >
            Semua
          </button>
          <button 
            className={`filter-btn ${filterCategory === 'Tanaman' ? 'active' : ''}`}
            onClick={() => setFilterCategory('Tanaman')}
          >
            Tanaman
          </button>
          <button 
            className={`filter-btn ${filterCategory === 'Candi' ? 'active' : ''}`}
            onClick={() => setFilterCategory('Candi')}
          >
            Candi
          </button>
        </div>

        <button className="btn-add" onClick={handleAdd}>
          <Plus size={20} />
          Tambah Produk
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem',
            color: '#6b7280'
          }}>
            Belum ada produk
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>
              
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                  {product.description || 'Tidak ada deskripsi'}
                </p>
                
                <div className="product-meta">
                  <span className="product-category">{product.category}</span>
                  <span className="product-stock">Stok: {product.stock}</span>
                </div>
              </div>

              <div className="product-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(product)}
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(product)}
                >
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tambah Produk Baru</h2>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmitAdd}>
              <div className="form-group">
                <label>Nama Produk</label>
                <input
                  type="text"
                  placeholder="Masukkan nama produk"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  placeholder="Masukkan deskripsi produk"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="Tanaman">Tanaman</option>
                    <option value="Candi">Candi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Stok</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>URL Gambar</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Produk</h2>
              <button className="btn-close" onClick={() => setShowEditModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label>Nama Produk</label>
                <input
                  type="text"
                  placeholder="Masukkan nama produk"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  placeholder="Masukkan deskripsi produk"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="Tanaman">Tanaman</option>
                    <option value="Candi">Candi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Stok</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>URL Gambar</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  Update Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2>Konfirmasi Hapus</h2>
              <button className="btn-close" onClick={() => setShowDeleteModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
                Apakah Anda yakin ingin menghapus produk <strong>{selectedProduct.name}</strong>?
              </p>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                  Batal
                </button>
                <button 
                  type="button" 
                  className="btn-submit" 
                  onClick={confirmDelete}
                  style={{ background: '#ef4444' }}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
