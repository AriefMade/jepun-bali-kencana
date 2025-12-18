'use client'
import '@/src/app/admin/panel/layout.css'
import {LayoutDashboard, GalleryVerticalEnd, UsersRound, UserRound} from 'lucide-react'
import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="admin-wrapper">
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-bg">
          <img src="/admin/Layer 8.png" alt="" className="bg-1" />
          <img src="/admin/Layer 18.png" alt="" className="bg-2" />
          <img src="/admin/Layer 20.png" alt="" className="bg-3" />
          <img src="/admin/Rhipsalis Garden.png" alt="" className="bg-4" />
        </div>
        <nav className="sidebar-menu">
          <a href="/admin/panel/dashboard" className="menu-item active">
             <LayoutDashboard />
            <span>Dashboard</span>
          </a>
          <a href="/admin/panel/galeri" className="menu-item">
            <GalleryVerticalEnd />
            <span>Galeri</span>
          </a>
          <a href="/admin/panel/testimoni" className="menu-item">
            <UsersRound />
            <span>Testimoni</span>
          </a>
          <a href="/admin/panel/profil" className="menu-item">
            <UserRound />
            <span>Profil Usaha</span>
          </a>
        </nav>
        <button className="logout-btn">Logout</button>
      </aside>
      
      <main className={`admin-content ${sidebarOpen ? '' : 'expanded'}`}>
        {children}
      </main>
    </div>
  )
}