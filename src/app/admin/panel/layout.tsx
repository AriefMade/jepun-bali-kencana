'use client'
import '@/src/app/admin/panel/layout.css'
import { LayoutDashboard, ShoppingBag, UsersRound, UserRound, LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe && sidebarOpen) {
      setSidebarOpen(false);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="admin-wrapper">
      <aside className={`sidebar ${!sidebarOpen ? 'closed' : ''}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">JBK</div>
            <span className="logo-text">Jepun Bali Kencana</span>
          </div>
          {/* Tombol X di dalam sidebar saat terbuka */}
          {sidebarOpen && (
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="sidebar-menu">
          <a href="/admin/panel/dashboard" className="menu-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a href="/admin/panel/produk" className="menu-item">
            <ShoppingBag size={20} />
            <span>Produk</span>
          </a>
          <a href="/admin/panel/testimoni" className="menu-item">
            <UsersRound size={20} />
            <span>Testimoni</span>
          </a>
          <a href="/admin/panel/profil-usaha" className="menu-item">
            <UserRound size={20} />
            <span>Profil Usaha</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="top-nav">
          {!sidebarOpen && (
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          )}
          <div className="top-nav-right">
            <div className="user-info">
              <div className="user-avatar">A</div>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </header>
        <main className={`admin-content ${sidebarOpen ? '' : 'expanded'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}