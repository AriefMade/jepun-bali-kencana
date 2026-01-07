'use client'
import './galeri.css';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

type Gallery = {
  id: number;
  image: string;
  date: Date;
};

export default function GaleriPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/galleries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (data.success) {
        setGalleries(data.galleries);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0]
    });
    setImageFile(null);
    setImagePreview('');
    setShowAddModal(true);
  };

  const handleDelete = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setShowDeleteModal(true);
  };

  const handleSubmitAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Pilih gambar terlebih dahulu');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);
      formDataToSend.append('date', formData.date);

      const res = await fetch('/api/galleries', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await res.json();
      if (data.success) {
        fetchGalleries();
        setShowAddModal(false);
        alert('Galeri berhasil ditambahkan!');
      } else {
        alert(data.error || 'Gagal menambah galeri');
      }
    } catch (error) {
      console.error('Error adding gallery:', error);
      alert('Terjadi kesalahan saat menambah galeri');
    }
  };

  const confirmDelete = async () => {
    if (!selectedGallery) return;

    try {
      const token = localStorage.getItem('token');
      const galleryId = selectedGallery.id;
      const res = await fetch(`/api/galleries?id=${galleryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        fetchGalleries();
        setShowDeleteModal(false);
        alert('Galeri berhasil dihapus!');
      } else {
        alert(data.error || 'Gagal menghapus galeri');
      }
    } catch (error) {
      console.error('Error deleting gallery:', error);
      alert('Terjadi kesalahan saat menghapus galeri');
    }
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
      <div className="galeri-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="galeri-container">
      <div className="page-header">
        <h1 className="page-title">Galeri</h1>
        <p className="page-subtitle">Kelola foto-foto galeri</p>
      </div>

      <div className="action-bar">
        <button className="btn-add" onClick={handleAdd}>
          <Plus size={20} />
          Tambah Foto
        </button>
      </div>

      <div className="galeri-grid">
        {galleries.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1',
            textAlign: 'center', 
            padding: '3rem',
            color: '#6b7280'
          }}>
            Belum ada foto di galeri
          </div>
        ) : (
          galleries.map((gallery) => (
            <div key={gallery.id} className="galeri-card">
              <div className="galeri-image">
                <img src={gallery.image} alt="Gallery" />
              </div>
              
              <div className="galeri-footer">
                <span className="galeri-date">{formatDate(gallery.date)}</span>
                <button 
                  className="btn-delete-small"
                  onClick={() => handleDelete(gallery)}
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
              <h2>Tambah Foto Galeri</h2>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmitAdd}>
              <div className="form-group">
                <label>Upload Gambar</label>
                <div className="image-upload-area">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <ImageIcon size={48} />
                      <p>Klik untuk upload gambar</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>
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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && selectedGallery && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon">
              <Trash2 size={48} />
            </div>
            <h2>Hapus Foto?</h2>
            <p>Apakah Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan.</p>
            
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