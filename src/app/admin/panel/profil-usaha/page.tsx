'use client'
import './profil.css';
import { Phone, MapPin, Facebook, MessageCircle, Instagram, MapPinned, Edit2, X, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

type ProfileData = {
  id: number;
  phone: string;
  address: string;
  facebook: string | null;
  whatsapp: string | null;
  instagram: string | null;
  gmaps: string | null;
};

export default function ProfilUsahaPage() {
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState<string>('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/profile-data', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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

  const handleEdit = (field: string) => {
    if (!profileData) return;
    setEditField(field);
    setEditValue((profileData[field as keyof ProfileData] as string) || '');
    setShowEditModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/profile-data/${profileData.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...profileData,
          [editField]: editValue
        })
      });

      const data = await res.json();
      if (data.success) {
        setProfileData(data.profileData);
        setShowEditModal(false);
        alert('Data profil berhasil diupdate!');
      } else {
        alert(data.error || 'Gagal update data profil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Terjadi kesalahan saat update data profil');
    }
  };

  const getFieldLabel = (field: string): string => {
    const labels: { [key: string]: string } = {
      phone: 'No Handphone',
      address: 'Alamat',
      facebook: 'Facebook',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      gmaps: 'Google Maps'
    };
    return labels[field] || field;
  };

  if (loading) {
    return (
      <div className="profil-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="profil-container">
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          Data profil tidak ditemukan
        </div>
      </div>
    );
  }

  const profileFields = [
    { 
      id: 'phone', 
      label: 'No Handphone', 
      value: profileData.phone, 
      icon: <Phone size={24} />,
      color: '#0D986A'
    },
    { 
      id: 'address', 
      label: 'Alamat', 
      value: profileData.address, 
      icon: <MapPin size={24} />,
      color: '#3b82f6'
    },
    { 
      id: 'facebook', 
      label: 'Facebook', 
      value: profileData.facebook || '-', 
      icon: <Facebook size={24} />,
      color: '#1877f2'
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      value: profileData.whatsapp || '-', 
      icon: <MessageCircle size={24} />,
      color: '#25d366'
    },
    { 
      id: 'instagram', 
      label: 'Instagram', 
      value: profileData.instagram || '-', 
      icon: <Instagram size={24} />,
      color: '#e4405f'
    },
    { 
      id: 'gmaps', 
      label: 'Google Maps', 
      value: profileData.gmaps || '-', 
      icon: <MapPinned size={24} />,
      color: '#ea4335'
    },
  ];

  return (
    <div className="profil-container">
      <div className="page-header">
        <h1 className="page-title">Profil Usaha</h1>
        <p className="page-subtitle">Kelola informasi kontak dan lokasi usaha Anda</p>
      </div>

      <div className="profile-grid">
        {profileFields.map((field) => (
          <div key={field.id} className="profile-item">
            <div className="profile-icon" style={{ background: field.color }}>
              {field.icon}
            </div>
            
            <div className="profile-content">
              <h3 className="profile-label">{field.label}</h3>
              <p className="profile-value">{field.value}</p>
            </div>

            <button 
              className="btn-edit-icon"
              onClick={() => handleEdit(field.id)}
            >
              <Edit2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit {profileFields.find(f => f.id === editField)?.label}</h2>
              <button className="btn-close" onClick={() => setShowEditModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{getFieldLabel(editField)}</label>
                {editField === 'address' ? (
                  <textarea 
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={4}
                    placeholder={`Masukkan ${getFieldLabel(editField)}`}
                  />
                ) : (
                  <input 
                    type="text" 
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder={`Masukkan ${getFieldLabel(editField)}`}
                  />
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-submit">
                  <Save size={18} />
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}