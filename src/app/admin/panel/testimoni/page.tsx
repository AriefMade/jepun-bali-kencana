'use client'
import './testimoni.css';
import { Plus, Edit2, Trash2, X, Star, User } from 'lucide-react';
import { useState, useEffect } from 'react';

type Testimoni = {
  id: number;
  name: string;
  message: string;
  rating: number;
  category: string | null;
  avatar: string | null;
  date: Date;
};

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState<Testimoni[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestimoni, setSelectedTestimoni] = useState<Testimoni | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 5,
    category: '',
    avatar: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/testimonials', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      message: '',
      rating: 5,
      category: '',
      avatar: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(true);
  };

  const handleEdit = (testimoni: Testimoni) => {
    setSelectedTestimoni(testimoni);
    setFormData({
      name: testimoni.name,
      message: testimoni.message,
      rating: testimoni.rating,
      category: testimoni.category || '',
      avatar: testimoni.avatar || '',
      date: new Date(testimoni.date).toISOString().split('T')[0]
    });
    setShowEditModal(true);
  };

  const handleDelete = (testimoni: Testimoni) => {
    setSelectedTestimoni(testimoni);
    setShowDeleteModal(true);
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
        setShowAddModal(false);
        alert('Testimoni berhasil ditambahkan!');
      } else {
        alert(data.error || 'Gagal menambah testimoni');
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      alert('Terjadi kesalahan saat menambah testimoni');
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTestimoni) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/testimonials/${selectedTestimoni.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
        setShowEditModal(false);
        alert('Testimoni berhasil diupdate!');
      } else {
        alert(data.error || 'Gagal update testimoni');
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Terjadi kesalahan saat update testimoni');
    }
  };

  const confirmDelete = async () => {
    if (!selectedTestimoni) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/testimonials/${selectedTestimoni.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
        setShowDeleteModal(false);
        alert('Testimoni berhasil dihapus!');
      } else {
        alert(data.error || 'Gagal menghapus testimoni');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Terjadi kesalahan saat menghapus testimoni');
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < count ? '#fbbf24' : 'none'}
        color={i < count ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="testimoni-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="testimoni-container">
      <div className="page-header">
        <h1 className="page-title">Testimoni Pelanggan</h1>
        <p className="page-subtitle">Kelola testimoni dan ulasan dari pelanggan</p>
      </div>

      <div className="action-bar">
        <button className="btn-add" onClick={handleAdd}>
          <Plus size={20} />
          Tambah Testimoni
        </button>
      </div>

      <div className="testimoni-list">
        {testimonials.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#6b7280'
          }}>
            Belum ada testimoni
          </div>
        ) : (
          testimonials.map((testimoni) => (
            <div key={testimoni.id} className="testimoni-card">
              <div className="card-avatar">
                {testimoni.avatar ? (
                  <img src={testimoni.avatar} alt={testimoni.name} />
                ) : (
                  <div className="avatar-placeholder">
                    <User size={32} />
                  </div>
                )}
              </div>

              <div className="card-content">
                <div className="card-header-info">
                  <h3 className="customer-name">{testimoni.name}</h3>
                  <div className="rating-stars">
                    {renderStars(testimoni.rating)}
                  </div>
                </div>

                <p className="customer-message">{testimoni.message}</p>

                <div className="card-meta">
                  {testimoni.category && (
                    <span className="category-badge">{testimoni.category}</span>
                  )}
                  <span className="testimoni-date">{formatDate(testimoni.date)}</span>
                </div>
              </div>

              <div className="card-actions">
                <button 
                  className="btn-edit-small"
                  onClick={() => handleEdit(testimoni)}
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  className="btn-delete-small"
                  onClick={() => handleDelete(testimoni)}
                >
                  <Trash2 size={16} />
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
              <h2>Tambah Testimoni Baru</h2>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmitAdd}>
              <div className="form-group">
                <label>Nama Pelanggan</label>
                <input
                  type="text"
                  placeholder="Masukkan nama pelanggan"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Testimoni</label>
                <textarea
                  placeholder="Masukkan testimoni pelanggan"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori Produk</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Tanaman">Tanaman</option>
                    <option value="Candi">Candi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="star-button"
                        onClick={() => setFormData({...formData, rating: star})}
                      >
                        <Star 
                          size={28} 
                          fill={star <= formData.rating ? '#fbbf24' : 'none'}
                          color={star <= formData.rating ? '#fbbf24' : '#d1d5db'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>URL Avatar (Opsional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Tanggal</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  Tambah Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedTestimoni && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Testimoni</h2>
              <button className="btn-close" onClick={() => setShowEditModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label>Nama Pelanggan</label>
                <input
                  type="text"
                  placeholder="Masukkan nama pelanggan"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Testimoni</label>
                <textarea
                  placeholder="Masukkan testimoni pelanggan"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori Produk</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Tanaman">Tanaman</option>
                    <option value="Candi">Candi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="star-button"
                        onClick={() => setFormData({...formData, rating: star})}
                      >
                        <Star 
                          size={28} 
                          fill={star <= formData.rating ? '#fbbf24' : 'none'}
                          color={star <= formData.rating ? '#fbbf24' : '#d1d5db'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>URL Avatar (Opsional)</label>
                <input
                  type="text"
                  placeholder="https://example.com/avatar.jpg"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Tanggal</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTestimoni && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon">
              <Trash2 size={48} />
            </div>
            <h2>Hapus Testimoni?</h2>
            <p>Apakah Anda yakin ingin menghapus testimoni dari <strong>{selectedTestimoni.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                Batal
              </button>
              <button className="btn-delete-confirm" onClick={confirmDelete}>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}