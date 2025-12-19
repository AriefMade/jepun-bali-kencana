'use client'
import './testimoni.css';
import { Plus, Star, Edit2, Trash2, X, Upload, User } from 'lucide-react';
import { useState } from 'react';

type Testimoni = {
  id: number;
  name: string;
  message: string;
  rating: number;
  category: string;
  avatar: string;
  date: string;
};

const dummyTestimoni: Testimoni[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    message: 'Pelayanan sangat memuaskan, tanaman yang dibeli berkualitas tinggi dan sehat!',
    rating: 5,
    category: 'Tanaman',
    avatar: '',
    date: '2024-12-15'
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    message: 'Miniatur candinya sangat detail dan indah, cocok untuk koleksi.',
    rating: 5,
    category: 'Candi',
    avatar: '',
    date: '2024-12-14'
  },
  {
    id: 3,
    name: 'Ahmad Wijaya',
    message: 'Harga terjangkau dengan kualitas premium. Recommended!',
    rating: 4,
    category: 'Tanaman',
    avatar: '',
    date: '2024-12-13'
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    message: 'Bonsai serut yang saya beli sangat cantik dan terawat dengan baik.',
    rating: 5,
    category: 'Tanaman',
    avatar: '',
    date: '2024-12-12'
  },
  {
    id: 5,
    name: 'Eko Prasetyo',
    message: 'Pengiriman cepat dan packaging rapi. Sangat puas!',
    rating: 5,
    category: 'Tanaman',
    avatar: '',
    date: '2024-12-11'
  },
  {
    id: 6,
    name: 'Maya Putri',
    message: 'Relief ukiran bali sangat indah, cocok untuk dekorasi rumah.',
    rating: 4,
    category: 'Candi',
    avatar: '',
    date: '2024-12-10'
  },
];

export default function TestimoniPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestimoni, setSelectedTestimoni] = useState<Testimoni | null>(null);
  const [rating, setRating] = useState(5);

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

  return (
    <div className="testimoni-container">
      <div className="page-header">
        <h1 className="page-title">Testimoni Pelanggan</h1>
        <p className="page-subtitle">Kelola testimoni dan ulasan dari pelanggan</p>
      </div>

      <div className="action-bar">
        <button className="btn-add" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Tambah Testimoni
        </button>
      </div>

      <div className="testimoni-list">
        {dummyTestimoni.map((testimoni) => (
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
                <span className="category-badge">{testimoni.category}</span>
                <span className="testimoni-date">{new Date(testimoni.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="btn-edit-small"
                onClick={() => {
                  setSelectedTestimoni(testimoni);
                  setRating(testimoni.rating);
                  setShowEditModal(true);
                }}
              >
                <Edit2 size={16} />
              </button>
              <button 
                className="btn-delete-small"
                onClick={() => {
                  setSelectedTestimoni(testimoni);
                  setShowDeleteModal(true);
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{showAddModal ? 'Tambah Testimoni Baru' : 'Edit Testimoni'}</h2>
              <button className="btn-close" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form" onSubmit={(e) => {
              e.preventDefault();
              setShowAddModal(false);
              setShowEditModal(false);
            }}>
              <div className="form-group">
                <label>Upload Foto Pelanggan (Opsional)</label>
                <div className="upload-area">
                  <Upload size={32} />
                  <p>Klik atau drag gambar di sini</p>
                  <input type="file" accept="image/*" />
                </div>
              </div>

              <div className="form-group">
                <label>Nama Pelanggan</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama pelanggan" 
                  defaultValue={selectedTestimoni?.name}
                  required
                />
              </div>

              <div className="form-group">
                <label>Testimoni</label>
                <textarea 
                  placeholder="Masukkan testimoni pelanggan" 
                  defaultValue={selectedTestimoni?.message}
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori Produk</label>
                  <select defaultValue={selectedTestimoni?.category}>
                    <option>Tanaman</option>
                    <option>Candi</option>
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
                        onClick={() => setRating(star)}
                      >
                        <Star 
                          size={28} 
                          fill={star <= rating ? '#fbbf24' : 'none'}
                          color={star <= rating ? '#fbbf24' : '#d1d5db'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  {showAddModal ? 'Tambah Testimoni' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon">
              <Trash2 size={48} />
            </div>
            <h2>Hapus Testimoni?</h2>
            <p>Apakah Anda yakin ingin menghapus testimoni dari <strong>{selectedTestimoni?.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            
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