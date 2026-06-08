import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'

export default function Navigation() {
  const { user, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const loc = useLocation()
  const isDark = theme === 'dark'

  const publicLinks = [
    { path: '/landing', label: 'Home' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Create Wallet' },
  ]

  const authLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/send', label: 'Send' },
    { path: '/receive', label: 'Receive' },
    { path: '/settings', label: 'Settings' },
  ]

  const links = user ? authLinks : publicLinks

  return (
    <header style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '15px 30px', background: isDark ? '#0f0f23' : '#f5f5f5', 
      borderBottom: `1px solid ${isDark ? '#333' : '#ddd'}` 
    }}>
      <nav style={{ display: 'flex', gap: 20 }}>
        {links.map(item => (
          <Link key={item.path} to={item.path} 
            style={{ 
              color: loc.pathname === item.path ? (isDark ? '#00d9ff' : '#0066cc') : (isDark ? '#aaa' : '#666'),
              textDecoration: 'none', fontWeight: 500 
            }}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={toggle} title="Toggle theme" style={{ background: 'none', fontSize: 20 }}>
          {isDark ? '☀️' : '🌙'}
        </button>
        {user && (
          <button onClick={logout}
            style={{ background: '#ff4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4 }}>
            Logout
          </button>
        )}
      </div>
    </header>
  )
}