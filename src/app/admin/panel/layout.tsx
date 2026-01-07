'use client'
import '@/src/app/admin/panel/layout.css'
import { LayoutDashboard, ShoppingBag, UsersRound, UserRound, ImageIcon, LogOut, Menu, X, SquareChartGantt } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Admin')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const minSwipeDistance = 50;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        router.push('/auth/login')
        return
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!res.ok) {
          throw new Error('Invalid token')
        }

        const data = await res.json()
        setUserName(data.user.name)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auth error:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/auth/login')
    }
  }

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

    const isActive = (path: string) => pathname === path;

  if (loading) {
    return (
      <div className='loading'>
        Loading...
      </div>
    )
  }

    if (!isAuthenticated) {
    return null
  }

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
          <a 
            href="/admin/panel/dashboard" 
            className={`menu-item ${isActive('/admin/panel/dashboard') ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a 
            href="/admin/panel/projects" 
            className={`menu-item ${isActive('/admin/panel/projects') ? 'active' : ''}`}
          >
            <SquareChartGantt size={20} />
            <span>Projects</span>
          </a>
          <a 
            href="/admin/panel/produk" 
            className={`menu-item ${isActive('/admin/panel/produk') ? 'active' : ''}`}
          >
            <ShoppingBag size={20} />
            <span>Produk</span>
          </a>
          <a 
            href="/admin/panel/gallery" 
            className={`menu-item ${isActive('/admin/panel/gallery') ? 'active' : ''}`}
          >
            <ImageIcon size={20} />
            <span>Gallery</span>
          </a>
          <a 
            href="/admin/panel/testimoni" 
            className={`menu-item ${isActive('/admin/panel/testimoni') ? 'active' : ''}`}
          >
            <UsersRound size={20} />
            <span>Testimoni</span>
          </a>
          <a 
            href="/admin/panel/profil-usaha" 
            className={`menu-item ${isActive('/admin/panel/profil-usaha') ? 'active' : ''}`}
          >
            <UserRound size={20} />
            <span>Profil Usaha</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => handleLogout()}>
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