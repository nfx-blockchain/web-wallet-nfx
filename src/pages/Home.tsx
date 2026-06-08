import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, provider } = useAuth()
  const { theme } = useTheme()
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<Array<{ txid: string, amount: string, confirmations: number }>>([])
  const isDark = theme === 'dark'

  useEffect(() => {
    if (!provider || !user) return
    setLoading(true)
    provider.getBalance().then(setBalance).finally(() => setLoading(false))
    // Mock history
    setHistory([
      { txid: '0x' + Math.random().toString(36).slice(2, 18), amount: '-10.5', confirmations: 120 },
      { txid: '0x' + Math.random().toString(36).slice(2, 18), amount: '+50.0', confirmations: 50 }
    ])
  }, [provider, user])

  const copyAddress = () => {
    if (user?.address) {
      navigator.clipboard.writeText(user.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!user) return <Navigate to="/landing" replace />

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <div style={{ 
        background: isDark ? '#1a1a3e' : '#fff', 
        padding: 30, borderRadius: 12, marginBottom: 20,
        border: `1px solid ${isDark ? '#333' : '#ddd'}` 
      }}>
        <h2 style={{ marginBottom: 15 }}>Wallet Overview</h2>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5, color: '#888' }}>Your Address</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <code style={{ 
              background: isDark ? '#0f0f23' : '#f5f5f5', 
              padding: 10, borderRadius: 4, flex: 1, fontSize: 14,
              userSelect: 'all' 
            }}>{user.address}</code>
            <button onClick={copyAddress} style={{ 
              padding: '8px 16px', background: copied ? '#44cc44' : '#00d9ff',
              color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer' 
            }}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5, color: '#888' }}>Balance</label>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: isDark ? '#00d9ff' : '#0066cc', marginBottom: 20 }}>
            {loading ? 'Loading...' : balance} NFX
          </div>
        </div>
      </div>

      <div style={{ 
        background: isDark ? '#1a1a3e' : '#fff', 
        padding: 20, borderRadius: 12,
        border: `1px solid ${isDark ? '#333' : '#ddd'}` 
      }}>
        <h3 style={{ marginBottom: 15 }}>Recent Transactions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${isDark ? '#333' : '#ddd'}` }}>
              <th style={{ textAlign: 'left', padding: 10 }}>TXID</th>
              <th style={{ textAlign: 'right', padding: 10 }}>Amount</th>
              <th style={{ textAlign: 'right', padding: 10 }}>Confirmations</th>
            </tr>
          </thead>
          <tbody>
            {history.map((tx, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${isDark ? '#222' : '#eee'}` }}>
                <td style={{ padding: 10, fontFamily: 'monospace', fontSize: 12 }}>
                  {tx.txid.slice(0, 16)}...
                </td>
                <td style={{ padding: 10, textAlign: 'right', color: tx.amount.startsWith('-') ? '#ff6b6b' : '#44cc44' }}>
                  {tx.amount}
                </td>
                <td style={{ padding: 10, textAlign: 'right' }}>{tx.confirmations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}