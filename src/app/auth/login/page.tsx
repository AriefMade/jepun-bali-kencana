"use client"

import './page.css'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login gagal')
      }

      // Simpan token di localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect ke dashboard
      router.push("/admin/panel/dashboard")
    } catch (err: any) {
      setError(err.message)
      alert(err.message || "Login gagal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-wrapper">
      <div className="form" style={{ display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        <div style={{ width: '53.5px', background: '#2B8663', borderRadius: '34px 0 0 34px' }} />

        <div style={{ flex: 1, display: 'flex', gap: '40px', padding: '40px' }}>
          <aside className="auth-pict" style={{ flex: 1 }}>
            <img src="/pana.png" alt="auth-image" style={{ width: '100%' }} />
          </aside>

          <div style={{ flex: 1 }}>
            <p className="header">Hello Admin</p>

            {error && (
              <div style={{ 
                background: '#f8d7da', 
                color: '#721c24', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                marginTop: '20px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            <div style={{ marginTop: error ? '20px' : '70px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#F3F3F3', borderRadius: 34, padding: '0 20px', height: '48px', alignContent: 'center' }}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  disabled={loading}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    outline: 'none',
                    width: '100%',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ background: '#F3F3F3', borderRadius: 34, padding: '0 20px', height: '48px', alignContent: 'center' }}>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  disabled={loading}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    outline: 'none',
                    width: '100%',
                    fontSize: '16px'
                  }}
                />
              </div>

              <button 
                type="submit" 
                className='button'
                disabled={loading}
                style={{
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                <span className="text-btn">
                  {loading ? 'Loading...' : 'Lets Start'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}