import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import PageLayout from '../components/PageLayout'

export default function Login() {
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, user } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    if (user) window.location.assign('/')
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(address, password)
  }

  return (
    <PageLayout title="Login">
      <form onSubmit={handleSubmit}>
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required
          autoComplete="username"
          style={{ width: '100%', padding: 12, marginBottom: 10, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
          autoComplete="current-password"
          style={{ width: '100%', padding: 12, marginBottom: 15, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#00d9ff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Loading...' : 'Unlock Wallet'}
        </button>
      </form>
      <p style={{ marginTop: 20, textAlign: 'center' }}>
        New? <a href="/register" style={{ color: '#00d9ff' }}>Create Wallet</a>
      </p>
    </PageLayout>
  )
}