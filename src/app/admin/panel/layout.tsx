export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-wrapper">
       <aside className="sidebar">
        <img className="sidebar-decoration-1" src="https://placehold.co/94x327" alt="" />
        <img className="sidebar-decoration-2" src="https://placehold.co/121x544" alt="" />
        <img className="sidebar-decoration-3" src="https://placehold.co/278x201" alt="" />
        <nav>
          <a href="/admin/dashboard">
          <div className="icon-dashboard-grid-1" />
          <div className="icon-dashboard-grid-2" />
          <div className="icon-dashboard-grid-3" />
          <div className="icon-dashboard-grid-4" />
          <div className="nav-dashboard">Dashboard</div>
          </a>
        <a href="/admin/galeri">
          <div className="icon-galeri-base" />
          <div className="icon-galeri-dot-1" />
          <div className="icon-galeri-dot-2" />
          <div className="icon-galeri-dot-3" />
          <div className="icon-galeri-frame" />
          <div className="nav-galeri">Galeri</div>
            </a>
<a href="/admin/testimoni">
          <div className="nav-item-active" />
          <div className="icon-testimoni-roof" />
          <div className="icon-testimoni-person-1" />
          <div className="icon-testimoni-person-2" />
          <div className="nav-testimoni">Testimoni</div>
</a>
        <a href="/admin/profil-usaha">
          <div className="icon-profil-roof" />
          <div className="icon-profil-person" />
          <div className="nav-profil">Profil Usaha</div>
        </a>
        </nav>

        <button className="logout-button">Logout</button>
        <div className="logout-border" />
      </aside>

      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}
