import "./dashboard.css";
export default function DashboardPage() {
  return (
    <div className="dashboard-wrapper">
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">Dashboard - Jepun Bali Kencana</h1>
        </header>

        <div className="dashboard-grid">
          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon" />
              <div>
                <h2 className="stat-title">Kategori</h2>
                <p className="stat-value">3</p>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon" />
              <div>
                <h2 className="stat-title">Total Pengunjung</h2>
                <p className="stat-value">300</p>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon" />
              <div>
                <h2 className="stat-title">Total Testimoni</h2>
                <p className="stat-value">???</p>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-icon" />
              <div>
                <h2 className="stat-title">Total Produk</h2>
                <p className="stat-value">700</p>
              </div>
            </article>
          </section>

          <section className="product-statistic">
            <header>
              <h2 className="product-title">Statistik Produk</h2>
              <p className="product-subtitle">Dari jumlah total produk yang kamu miliki</p>
            </header>

            <div className="pie-wrapper">
              <div className="pie-background" />
              <div className="pie-overlay" />
            </div>

            <div className="legend">
              <div className="legend-item">
                <span className="legend-label">Tanaman</span>
                <span className="legend-value">15</span>
                <span className="legend-bar legend-bar-green"></span>
                <span className="legend-percent">60%</span>
              </div>

              <div className="legend-item">
                <span className="legend-label">Candi</span>
                <span className="legend-value">10</span>
                <span className="legend-bar legend-bar-gray"></span>
                <span className="legend-percent">40%</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
