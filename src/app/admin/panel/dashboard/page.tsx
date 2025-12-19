import "./dashboard.css";
import { TrendingUp, Package, Users, FolderOpen } from 'lucide-react';

export default function DashboardPage() {
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
            <p className="stat-label">Kategori</p>
            <h3 className="stat-value">3</h3>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>+2 bulan ini</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Pengunjung</p>
            <h3 className="stat-value">300</h3>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>+12% minggu ini</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Testimoni</p>
            <h3 className="stat-value">45</h3>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>+5 baru</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Produk</p>
            <h3 className="stat-value">700</h3>
            <div className="stat-trend positive">
              <TrendingUp size={14} />
              <span>+20 produk baru</span>
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
                  strokeDasharray="301.6 502.7"
                  strokeDashoffset="125.7"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="pie-center">
                <p className="pie-total">700</p>
                <p className="pie-label">Total</p>
              </div>
            </div>

            <div className="legend-container">
              <div className="legend-item">
                <div className="legend-indicator green"></div>
                <div className="legend-content">
                  <p className="legend-label">Tanaman</p>
                  <p className="legend-value">420 produk</p>
                </div>
                <p className="legend-percent">60%</p>
              </div>

              <div className="legend-item">
                <div className="legend-indicator gray"></div>
                <div className="legend-content">
                  <p className="legend-label">Candi</p>
                  <p className="legend-value">280 produk</p>
                </div>
                <p className="legend-percent">40%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card recent-activity">
          <div className="card-header">
            <h2 className="card-title">Aktivitas Terkini</h2>
          </div>
          
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📦</div>
              <div className="activity-content">
                <p className="activity-title">Produk baru ditambahkan</p>
                <p className="activity-time">2 jam yang lalu</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">💬</div>
              <div className="activity-content">
                <p className="activity-title">Testimoni baru dari pelanggan</p>
                <p className="activity-time">5 jam yang lalu</p>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-content">
                <p className="activity-title">Profil usaha diperbarui</p>
                <p className="activity-time">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}