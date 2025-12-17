import '@/src/app/admin/panel/layout.css'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-wrapper">
      <aside className="sidebar">
        <div className="sidebar-bg">
          <img src="/admin/Layer 8.png" alt="" className="bg-1" />
          <img src="/admin/Layer 18.png" alt="" className="bg-2" />
          <img src="/admin/Layer 20.png" alt="" className="bg-3" />
          <img src="/admin/Rhipsalis Garden.png" alt="" className="bg-4" />
        <nav className="sidebar-menu">
          <a href="/admin/panel/dashboard" className="menu-item active">
            <div className="menu-icon dashboard-icon"></div>
            <span>Dashboard</span>
          </a>
          <a href="/admin/panel/galeri" className="menu-item">
            <div className="menu-icon gallery-icon"></div>
            <span>Galeri</span>
          </a>
          <a href="/admin/panel/testimoni" className="menu-item">
            <div className="menu-icon testimoni-icon"></div>
            <span>Testimoni</span>
          </a>
          <a href="/admin/panel/profil" className="menu-item">
            <div className="menu-icon profil-icon"></div>
            <span>Profil Usaha</span>
          </a>
        </nav>
        <button className="logout-btn">Logout</button>
        </div>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}