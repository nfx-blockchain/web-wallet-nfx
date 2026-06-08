import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import PageLayout from '../components/PageLayout'

export default function Register() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const { register, loading, user } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    if (user) window.location.assign('/')
  }, [user])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) return
    await register(password)
  }

  return (
    <PageLayout title="Create Wallet">
      <form onSubmit={handleRegister}>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required
          autoComplete="new-password"
          style={{ width: '100%', padding: 12, marginBottom: 10, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }} />
        <input placeholder="Confirm Password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
          autoComplete="new-password"
          style={{ width: '100%', padding: 12, marginBottom: 15, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#00d9ff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Creating...' : 'Create Wallet'}
        </button>
      </form>
      <p style={{ marginTop: 20 }}>Already have wallet? <a href="/login" style={{ color: '#00d9ff' }}>Login</a></p>
    </PageLayout>
  )
}