'use client';

import "./dashboard.css";
import { TrendingUp, Package, Users, FolderOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

type DashboardStats = {
  projects: {
    total: number;
    published: number;
    draft: number;
  };
  visitors: {
    today: number;
  };
  testimonials: {
    total: number;
  };
  products: {
    total: number;
    byCategory: Array<{
      category: string;
      _count: { id: number };
    }>;
  };
};

type RecentActivity = {
  projects: Array<{
    id: number;
    title: string;
    category: string;
    createdAt: string;
  }>;
  testimonials: Array<{
    id: number;
    name: string;
    createdAt: string;
  }>;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Token tidak ditemukan. Silakan login kembali.');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response bukan JSON. Endpoint mungkin tidak ditemukan.');
      }

      const data = await res.json();
      
      if (data.success) {
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
        setError(null);
      } else {
        setError(data.error || 'Gagal mengambil data dashboard');
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const calculateProductPercentage = (category: string) => {
    if (!stats?.products.byCategory || stats.products.total === 0) return 0;
    const categoryData = stats.products.byCategory.find(c => c.category === category);
    if (!categoryData) return 0;
    return Math.round((categoryData._count.id / stats.products.total) * 100);
  };

  const getProductCount = (category: string) => {
    if (!stats?.products.byCategory) return 0;
    const categoryData = stats.products.byCategory.find(c => c.category === category);
    return categoryData?._count.id || 0;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 hari yang lalu';
    return `${diffInDays} hari yang lalu`;
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          background: '#fee',
          borderRadius: '8px',
          color: '#c00'
        }}>
          <h3>Error</h3>
          <p>{error}</p>
          <button 
            onClick={fetchDashboardData}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#0D986A',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Tidak ada data</p>
        </div>
      </div>
    );
  }

  const tanamanPercentage = calculateProductPercentage('Tanaman');
  const tanamanDash = (tanamanPercentage / 100) * 502.7;

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Selamat datang kembali! Ini adalah ringkasan bisnis Anda hari ini.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon green">
            <FolderOpen size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Project</p>
            <h3 className="stat-value">{stats.projects.total}</h3>
            <div className="stat-trend positive">
              <span>{stats.projects.published} published, {stats.projects.draft} draft</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pengunjung Hari Ini</p>
            <h3 className="stat-value">{stats.visitors.today}</h3>
            <div className="stat-trend">
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Unique visitors hari ini
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Testimoni</p>
            <h3 className="stat-value">{stats.testimonials.total}</h3>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>Dari pelanggan</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Produk</p>
            <h3 className="stat-value">{stats.products.total}</h3>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>{stats.products.byCategory.length} kategori</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card product-chart">
          <div className="card-header">
            <h2 className="card-title">Statistik Produk</h2>
            <p className="card-subtitle">Distribusi kategori produk</p>
          </div>

          <div className="pie-container">
            <div className="pie-chart">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="40"/>
                <circle 
                  cx="100" 
                  cy="100" 
                  r="80" 
                  fill="none" 
                  stroke="#0D986A" 
                  strokeWidth="40"
                  strokeDasharray={`${tanamanDash} 502.7`}
                  strokeDashoffset="125.7"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="pie-center">
                <p className="pie-total">{stats.products.total}</p>
                <p className="pie-label">Total</p>
              </div>
            </div>

            <div className="legend-container">
              <div className="legend-item">
                <div className="legend-indicator green"></div>
                <div className="legend-content">
                  <p className="legend-label">Tanaman</p>
                  <p className="legend-value">{getProductCount('Tanaman')} produk</p>
                </div>
                <p className="legend-percent">{tanamanPercentage}%</p>
              </div>

              <div className="legend-item">
                <div className="legend-indicator gray"></div>
                <div className="legend-content">
                  <p className="legend-label">Candi</p>
                  <p className="legend-value">{getProductCount('Candi')} produk</p>
                </div>
                <p className="legend-percent">{100 - tanamanPercentage}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card recent-activity">
          <div className="card-header">
            <h2 className="card-title">Aktivitas Terkini</h2>
          </div>
          
          <div className="activity-list">
            {recentActivity?.projects.slice(0, 2).map((project) => (
              <div key={`project-${project.id}`} className="activity-item">
                <div className="activity-icon">📁</div>
                <div className="activity-content">
                  <p className="activity-title">Project baru: {project.title}</p>
                  <p className="activity-time">{formatDate(project.createdAt)}</p>
                </div>
              </div>
            ))}

            {recentActivity?.testimonials.slice(0, 2).map((testimonial) => (
              <div key={`testimonial-${testimonial.id}`} className="activity-item">
                <div className="activity-icon">💬</div>
                <div className="activity-content">
                  <p className="activity-title">Testimoni baru dari {testimonial.name}</p>
                  <p className="activity-time">{formatDate(testimonial.createdAt)}</p>
                </div>
              </div>
            ))}

            {(!recentActivity?.projects.length && !recentActivity?.testimonials.length) && (
              <div className="activity-item">
                <div className="activity-icon">📭</div>
                <div className="activity-content">
                  <p className="activity-title">Belum ada aktivitas</p>
                  <p className="activity-time">Mulai tambahkan data</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}