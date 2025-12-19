'use client'
import './profil.css';
import { Phone, MapPin, Facebook, MessageCircle, Instagram, MapPinned, Edit2, X, Save } from 'lucide-react';
import { useState } from 'react';

type ProfileData = {
  phone: string;
  address: string;
  facebook: string;
  whatsapp: string;
  instagram: string;
  gmaps: string;
};

export default function ProfilUsahaPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editField, setEditField] = useState<string>('');
  const [profileData, setProfileData] = useState<ProfileData>({
    phone: '+62 878-5605-2262',
    address: 'Pemaron, Kec. Buleleng, Kabupaten Buleleng, Bali',
    facebook: 'https://facebook.com/jepunbalikencana',
    whatsapp: 'https://wa.me/6287856052262',
    instagram: 'https://instagram.com/jepunbalikencana',
    gmaps: 'https://maps.google.com/?q=jepun+bali+kencana'
  });

  const handleEdit = (field: string) => {
    setEditField(field);
    setShowEditModal(true);
  };

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
      value: profileData.facebook, 
      icon: <Facebook size={24} />,
      color: '#1877f2'
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      value: profileData.whatsapp, 
      icon: <MessageCircle size={24} />,
      color: '#25d366'
    },
    { 
      id: 'instagram', 
      label: 'Instagram', 
      value: profileData.instagram, 
      icon: <Instagram size={24} />,
      color: '#e4405f'
    },
    { 
      id: 'gmaps', 
      label: 'Google Maps', 
      value: profileData.gmaps, 
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

            <form className="modal-form" onSubmit={(e) => {
              e.preventDefault();
              setShowEditModal(false);
            }}>
              <div className="form-group">
                <label>{profileFields.find(f => f.id === editField)?.label}</label>
                {editField === 'address' ? (
                  <textarea 
                    defaultValue={profileData[editField as keyof ProfileData]}
                    rows={4}
                    placeholder={`Masukkan ${profileFields.find(f => f.id === editField)?.label}`}
                  />
                ) : (
                  <input 
                    type="text" 
                    defaultValue={profileData[editField as keyof ProfileData]}
                    placeholder={`Masukkan ${profileFields.find(f => f.id === editField)?.label}`}
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