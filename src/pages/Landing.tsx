import { Navigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'

export default function Landing() {
  const { theme } = useTheme()
  const { user, connectExtension, loading } = useAuth()
  const isDark = theme === 'dark'

  if (user) return <Navigate to="/" replace />

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: isDark ? 'radial-gradient(ellipse at center, #0B1020 0%, #050810 100%)' : '#f5f5f5',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'transparent',
        backgroundImage: isDark ? 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="30" cy="30" r="1" fill="%2300FFFF" fill-opacity="0.1"/%3E%3C/svg%3E")' : 'none',
        animation: 'moveStars 20s linear infinite'
      }} />
      <style>{`
        @keyframes moveStars {
          from { background-position: 0 0; }
          to { background-position: 60px 60px; }
        }
      `}</style>
      
      <header style={{ padding: '40px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: 64, color: '#00D4FF', marginBottom: 10 }}>NFX WebWallet</h1>
        <p style={{ fontSize: 24, color: '#aaa', margin: '10px 0 40px' }}>
          Secure, Fast, Decentralized Blockchain Wallet
        </p>
        <button onClick={connectExtension} disabled={loading} style={{ padding: '15px 40px', fontSize: 18, margin: '0 10px', background: '#7B3FF2', color: '#fff' }}>
          {loading ? 'Connecting...' : 'Connect NFXMask'}
        </button>
        <a href="/login"><button style={{ padding: '15px 40px', fontSize: 18, margin: '0 10px' }}>Login</button></a>
        <a href="/register"><button style={{ padding: '15px 40px', fontSize: 18, margin: '0 10px', background: '#00FFFF' }}>Create Wallet</button></a>
      </header>

      <section style={{ padding: '60px 20px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <FeatureCard icon="🔒" title="Secure" desc="Military-grade encryption protects your funds" dark={isDark} />
          <FeatureCard icon="⚡" title="Fast" desc="Lightning-fast transactions on NFX blockchain" dark={isDark} />
          <FeatureCard icon="🌐" title="Decentralized" desc="No central authority - truly yours" dark={isDark} />
          <FeatureCard icon="💰" title="Low Fees" desc="Minimal transaction costs" dark={isDark} />
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#666', marginTop: 60 }}>
        <p>&copy; 2026 NFX Blockchain. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc, dark }: { icon: string, title: string, desc: string, dark: boolean }) {
  return (
    <div style={{ 
      background: dark ? 'rgba(123, 63, 242, 0.1)' : 'rgba(0,0,0,0.05)', 
      padding: 20, borderRadius: 12, 
      border: `1px solid ${dark ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0,0,0,0.1)'}`, 
      transition: 'transform 0.2s' 
    }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
      <h3 style={{ fontSize: 18, marginBottom: 8, color: '#00D4FF' }}>{title}</h3>
      <p style={{ color: '#aaa', fontSize: 14 }}>{desc}</p>
    </div>
  )
}