'use client';

import { useState, useEffect } from 'react';
import './projects.css';

type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  isPublished: boolean;
  isFeatured: boolean;
  thumbnailImage: string;
};

const CATEGORIES = [
  'Taman Hunian',
  'Ruang Publik',
  'Komersial',
  'Kawasan Suci'
];

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [filterCategory]);

  const fetchProjects = async () => {
    try {
      const url = filterCategory === 'all' 
        ? '/api/projects' 
        : `/api/projects?category=${filterCategory}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/projects/id/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('Project berhasil dihapus');
        fetchProjects();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menghapus project');
    }
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowForm(true);
  };

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('token');
      const project = projects.find(p => p.id === id);
      
      const res = await fetch(`/api/projects/id/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...project,
          isPublished: !currentStatus
        })
      });

      if (res.ok) {
        fetchProjects();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-projects">
      <div className="admin-header">
        <div>
          <h1>Kelola Project Portfolio</h1>
          <p className="subtitle">Total {projects.length} project</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => {
            setEditId(null);
            setShowForm(true);
          }}
        >
          + Tambah Project
        </button>
      </div>

      {/* Filter */}
      <div className="filter-section">
        <button 
          className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
          onClick={() => setFilterCategory('all')}
        >
          Semua
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProjectForm 
              projectId={editId} 
              onClose={() => {
                setShowForm(false);
                fetchProjects();
              }} 
            />
          </div>
        </div>
      )}

      <div className="projects-grid-admin">
        {projects.map((project) => (
          <div key={project.id} className="project-card-admin">
            <div className="project-thumbnail">
              <img src={project.thumbnailImage || '/placeholder.jpg'} alt={project.title} />
              <div className="project-badges">
                {project.isFeatured && <span className="badge featured">Featured</span>}
                <span className={`badge ${project.isPublished ? 'published' : 'draft'}`}>
                  {project.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            
            <div className="project-info-admin">
              <div className="project-category-tag">{project.category}</div>
              <h3 className="project-title-admin">{project.title}</h3>
              <div className="project-meta-admin">
                <span>📍 {project.location}</span>
                <span>📅 {project.year}</span>
                <span>📏 {project.area}</span>
              </div>
            </div>

            <div className="project-actions">
              <button 
                className="btn-action btn-view"
                onClick={() => window.open(`/public/project/${project.slug}`, '_blank')}
                title="Lihat di public"
              >
                👁️ View
              </button>
              <button 
                className="btn-action btn-edit"
                onClick={() => handleEdit(project.id)}
              >
                ✏️ Edit
              </button>
              <button 
                className="btn-action btn-toggle"
                onClick={() => handleTogglePublish(project.id, project.isPublished)}
                title={project.isPublished ? 'Set Draft' : 'Publish'}
              >
                {project.isPublished ? '📦 Draft' : '✅ Publish'}
              </button>
              <button 
                className="btn-action btn-delete"
                onClick={() => handleDelete(project.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="empty-state">
          <p>Belum ada project di kategori ini</p>
        </div>
      )}
    </div>
  );
}

// Component Form
function ProjectForm({ projectId, onClose }: { projectId: number | null; onClose: () => void }) {
  const ensureString = (value: any): string => value || '';
  const ensureArray = (value: any): string[] => (Array.isArray(value) && value.length > 0) ? value : [''];
  const ensureBoolean = (value: any): boolean => Boolean(value);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Taman Hunian',
    location: '',
    area: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    clientType: 'Pribadi',
    budget: '',
    heroImage: '',
    thumbnailImage: '',
    beforeImage: '',
    initialCondition: '',
    mainChallenges: [''],
    clientNeeds: [''],
    siteAnalysis: '',
    designConcept: '',
    zoning: '',
    plantSelection: '',
    culturalIntegration: '',
    sketchImage: '',
    constructionSteps: [''],
    plantingProcess: '',
    functionalBenefits: [''],
    aestheticValue: '',
    testimonialName: '',
    testimonialRole: '',
    testimonialMessage: '',
    isPublished: false,
    isFeatured: false
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/id/${projectId}`);
      const data = await res.json();
      const p = data.project;
      setFormData({
        title: ensureString(p.title),
        category: ensureString(p.category) || 'Taman Hunian',
        location: ensureString(p.location),
        area: ensureString(p.area),
        duration: ensureString(p.duration),
        year: ensureString(p.year) || new Date().getFullYear().toString(),
        clientType: ensureString(p.clientType) || 'Pribadi',
        budget: ensureString(p.budget),
        heroImage: ensureString(p.heroImage),
        thumbnailImage: ensureString(p.thumbnailImage),
        beforeImage: ensureString(p.beforeImage),
        initialCondition: ensureString(p.initialCondition),
        mainChallenges: ensureArray(p.mainChallenges),
        clientNeeds: ensureArray(p.clientNeeds),
        siteAnalysis: ensureString(p.siteAnalysis),
        designConcept: ensureString(p.designConcept),
        zoning: ensureString(p.zoning),
        plantSelection: ensureString(p.plantSelection),
        culturalIntegration: ensureString(p.culturalIntegration),
        sketchImage: ensureString(p.sketchImage),
        constructionSteps: ensureArray(p.constructionSteps),
        plantingProcess: ensureString(p.plantingProcess),
        functionalBenefits: ensureArray(p.functionalBenefits),
        aestheticValue: ensureString(p.aestheticValue),
        testimonialName: ensureString(p.testimonialName),
        testimonialRole: ensureString(p.testimonialRole),
        testimonialMessage: ensureString(p.testimonialMessage),
        isPublished: ensureBoolean(p.isPublished),
        isFeatured: ensureBoolean(p.isFeatured)
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = projectId ? 'PUT' : 'POST';
    const url = projectId ? `/api/projects/id/${projectId}` : '/api/projects';

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Project berhasil disimpan');
        onClose();
      } else {
        const error = await res.json();
        alert('Error: ' + error.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyimpan project');
    }
  };

  const addArrayItem = (field: 'mainChallenges' | 'clientNeeds' | 'constructionSteps' | 'functionalBenefits') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const updateArrayItem = (
    field: 'mainChallenges' | 'clientNeeds' | 'constructionSteps' | 'functionalBenefits',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (
    field: 'mainChallenges' | 'clientNeeds' | 'constructionSteps' | 'functionalBenefits',
    index: number
  ) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  // Fungsi upload image
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'heroImage' | 'thumbnailImage' | 'beforeImage' | 'sketchImage'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi client-side
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setFormData(prev => ({
          ...prev,
          [field]: data.imageUrl
        }));
        alert('Image berhasil diupload!');
      } else {
        alert(data.error || 'Upload gagal');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-header">
        <h2>{projectId ? 'Edit Project' : 'Tambah Project Baru'}</h2>
        <button type="button" onClick={onClose} className="btn-close">×</button>
      </div>

      {/* Tabs */}
      <div className="form-tabs">
            <button
              type="button"
              className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Info Dasar
            </button>
            <button
              type="button"
              className={`tab ${activeTab === 'images' ? 'active' : ''}`}
              onClick={() => setActiveTab('images')}
            >
              Gambar
            </button>
            <button
              type="button"
              className={`tab ${activeTab === 'background' ? 'active' : ''}`}
              onClick={() => setActiveTab('background')}
            >
              Latar Belakang
            </button>
            <button
              type="button"
              className={`tab ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              Pendekatan Desain
            </button>
            <button
              type="button"
              className={`tab ${activeTab === 'process' ? 'active' : ''}`}
              onClick={() => setActiveTab('process')}
            >
              Proses
            </button>
            <button
              type="button"
              className={`tab ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              Hasil & Testimoni
            </button>
          </div>

          {/* Tab: Info Dasar */}
          {activeTab === 'basic' && (
            <div className="form-body">
              <div className="form-section">
              <div className="form-group">
                <label>Judul Project *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Taman Privat Villa Sanur"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="Taman Hunian">Taman Hunian</option>
                    <option value="Ruang Publik">Ruang Publik</option>
                    <option value="Komersial">Komersial</option>
                    <option value="Kawasan Suci">Kawasan Suci</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tipe Klien *</label>
                  <select
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                    required
                  >
                    <option value="Pribadi">Pribadi</option>
                    <option value="Institusi">Institusi</option>
                    <option value="Komersial">Komersial</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Lokasi *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Contoh: Sanur, Bali"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Luas Area *</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="Contoh: 450 m²"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Durasi Pengerjaan *</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Contoh: 3 bulan"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tahun *</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2024"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Budget (opsional)</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="Contoh: Rp 150-200 juta"
                />
              </div>

              <div className="form-group">
                <label>Hero Image URL *</label>
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  placeholder="/projects/nama-project-hero.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label>Thumbnail Image URL *</label>
                <input
                  type="text"
                  value={formData.thumbnailImage}
                  onChange={(e) => setFormData({ ...formData, thumbnailImage: e.target.value })}
                  placeholder="/projects/nama-project-thumb.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label>Before Image URL (opsional)</label>
                <input
                  type="text"
                  value={formData.beforeImage}
                  onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                  placeholder="/projects/nama-project-before.jpg"
                />
              </div>

              <div className="form-group-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  Publish project (tampilkan di website)
                </label>
              </div>

              <div className="form-group-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  Tandai sebagai Featured
                </label>
              </div>
            </div>
            </div>
          )}

          {/* Tab: Gambar - DENGAN FILE UPLOAD */}
          {activeTab === 'images' && (
            <div className="form-body">
            <div className="form-section">
              <h3>Gambar Project</h3>

              {/* Hero Image */}
              <div className="form-group">
                <label>Hero Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'heroImage')}
                  disabled={uploading}
                />
                {formData.heroImage && (
                  <div className="image-preview">
                    <img src={formData.heroImage} alt="Hero Preview" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, heroImage: '' })}
                      className="remove-image-btn"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Image */}
              <div className="form-group">
                <label>Thumbnail Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'thumbnailImage')}
                  disabled={uploading}
                />
                {formData.thumbnailImage && (
                  <div className="image-preview">
                    <img src={formData.thumbnailImage} alt="Thumbnail Preview" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, thumbnailImage: '' })}
                      className="remove-image-btn"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              {/* Before Image */}
              <div className="form-group">
                <label>Before Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'beforeImage')}
                  disabled={uploading}
                />
                {formData.beforeImage && (
                  <div className="image-preview">
                    <img src={formData.beforeImage} alt="Before Preview" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, beforeImage: '' })}
                      className="remove-image-btn"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              {/* Sketch Image */}
              <div className="form-group">
                <label>Sketch Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'sketchImage')}
                  disabled={uploading}
                />
                {formData.sketchImage && (
                  <div className="image-preview">
                    <img src={formData.sketchImage} alt="Sketch Preview" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, sketchImage: '' })}
                      className="remove-image-btn"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              {uploading && <p className="upload-status">Uploading...</p>}
            </div>
            </div>
          )}

          {/* Tab: Background */}
          {activeTab === 'background' && (
            <div className="form-body">
            <div className="form-section">
              <div className="form-group">
                <label>Kondisi Awal Tapak *</label>
                <textarea
                  value={formData.initialCondition}
                  onChange={(e) => setFormData({ ...formData, initialCondition: e.target.value })}
                  placeholder="Deskripsikan kondisi awal lokasi sebelum dikerjakan..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label>Permasalahan Utama *</label>
                {formData.mainChallenges.map((challenge, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={challenge}
                      onChange={(e) => updateArrayItem('mainChallenges', index, e.target.value)}
                      placeholder={`Tantangan ${index + 1}`}
                    />
                    {formData.mainChallenges.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('mainChallenges', index)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('mainChallenges')}
                  className="btn-add-item"
                >
                  + Tambah Tantangan
                </button>
              </div>

              <div className="form-group">
                <label>Kebutuhan Klien *</label>
                {formData.clientNeeds.map((need, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={need}
                      onChange={(e) => updateArrayItem('clientNeeds', index, e.target.value)}
                      placeholder={`Kebutuhan ${index + 1}`}
                    />
                    {formData.clientNeeds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('clientNeeds', index)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('clientNeeds')}
                  className="btn-add-item"
                >
                  + Tambah Kebutuhan
                </button>
              </div>
            </div>
            </div>
          )}

          {/* Tab: Design Approach */}
          {activeTab === 'design' && (
            <div className="form-body">
            <div className="form-section">
              <div className="form-group">
                <label>Analisis Tapak *</label>
                <textarea
                  value={formData.siteAnalysis}
                  onChange={(e) => setFormData({ ...formData, siteAnalysis: e.target.value })}
                  placeholder="Jelaskan proses analisis kondisi tapak..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Konsep Desain *</label>
                <textarea
                  value={formData.designConcept}
                  onChange={(e) => setFormData({ ...formData, designConcept: e.target.value })}
                  placeholder="Deskripsikan konsep utama desain..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Strategi Zoning *</label>
                <textarea
                  value={formData.zoning}
                  onChange={(e) => setFormData({ ...formData, zoning: e.target.value })}
                  placeholder="Jelaskan pembagian zona dan fungsinya..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Pemilihan Tanaman *</label>
                <textarea
                  value={formData.plantSelection}
                  onChange={(e) => setFormData({ ...formData, plantSelection: e.target.value })}
                  placeholder="Jelaskan jenis tanaman yang dipilih dan alasannya..."
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Integrasi Unsur Budaya (opsional)</label>
                <textarea
                  value={formData.culturalIntegration}
                  onChange={(e) => setFormData({ ...formData, culturalIntegration: e.target.value })}
                  placeholder="Jelaskan bagaimana unsur budaya lokal diintegrasikan..."
                  rows={3}
                />
              </div>
            </div>
            </div>
          )}

          {/* Tab: Process */}
          {activeTab === 'process' && (
            <div className="form-body">
            <div className="form-section">
              <div className="form-group">
                <label>Sketch Image URL (opsional)</label>
                <input
                  type="text"
                  value={formData.sketchImage}
                  onChange={(e) => setFormData({ ...formData, sketchImage: e.target.value })}
                  placeholder="/projects/nama-project-sketch.jpg"
                />
              </div>

              <div className="form-group">
                <label>Tahapan Konstruksi *</label>
                {formData.constructionSteps.map((step, index) => (
                  <div key={index} className="array-input">
                    <textarea
                      value={step}
                      onChange={(e) => updateArrayItem('constructionSteps', index, e.target.value)}
                      placeholder={`Tahap ${index + 1}`}
                      rows={2}
                    />
                    {formData.constructionSteps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('constructionSteps', index)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('constructionSteps')}
                  className="btn-add-item"
                >
                  + Tambah Tahapan
                </button>
              </div>

              <div className="form-group">
                <label>Proses Penanaman *</label>
                <textarea
                  value={formData.plantingProcess}
                  onChange={(e) => setFormData({ ...formData, plantingProcess: e.target.value })}
                  placeholder="Jelaskan proses penanaman dan finishing..."
                  rows={4}
                  required
                />
              </div>
            </div>
            </div>
          )}

          {/* Tab: Results */}
          {activeTab === 'results' && (
            <div className="form-body">
            <div className="form-section">
              <div className="form-group">
                <label>Manfaat Fungsional *</label>
                {formData.functionalBenefits.map((benefit, index) => (
                  <div key={index} className="array-input">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateArrayItem('functionalBenefits', index, e.target.value)}
                      placeholder={`Manfaat ${index + 1}`}
                    />
                    {formData.functionalBenefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('functionalBenefits', index)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('functionalBenefits')}
                  className="btn-add-item"
                >
                  + Tambah Manfaat
                </button>
              </div>

              <div className="form-group">
                <label>Nilai Estetika *</label>
                <textarea
                  value={formData.aestheticValue}
                  onChange={(e) => setFormData({ ...formData, aestheticValue: e.target.value })}
                  placeholder="Jelaskan dampak estetika dari hasil akhir..."
                  rows={3}
                  required
                />
              </div>

              <h3 className="subsection-title">Testimoni Klien (opsional)</h3>

              <div className="form-group">
                <label>Nama Klien</label>
                <input
                  type="text"
                  value={formData.testimonialName}
                  onChange={(e) => setFormData({ ...formData, testimonialName: e.target.value })}
                  placeholder="Contoh: Bapak Made Suteja"
                />
              </div>

              <div className="form-group">
                <label>Role/Jabatan</label>
                <input
                  type="text"
                  value={formData.testimonialRole}
                  onChange={(e) => setFormData({ ...formData, testimonialRole: e.target.value })}
                  placeholder="Contoh: Pemilik Villa"
                />
              </div>

              <div className="form-group">
                <label>Pesan Testimoni</label>
                <textarea
                  value={formData.testimonialMessage}
                  onChange={(e) => setFormData({ ...formData, testimonialMessage: e.target.value })}
                  placeholder="Kutipan testimoni dari klien..."
                  rows={4}
                />
              </div>
            </div>
            </div>
          )}
          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Batal
            </button>
            <button type="submit" className="btn-primary" disabled={uploading}>
              {uploading ? 'Uploading...' : (projectId ? 'Update Project' : 'Simpan Project')}
            </button>
          </div>
        </form>
  );
}