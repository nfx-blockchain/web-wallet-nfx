import { useTheme } from '../hooks/useTheme'
import PageLayout from '../components/PageLayout'

export default function Settings() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <PageLayout title="Settings">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>RPC Endpoint</label>
          <input placeholder="http://localhost:27444" defaultValue="http://localhost:27444"
            style={{ width: '100%', padding: 12, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Network</label>
          <select defaultValue="mainnet" style={{ width: '100%', padding: 12, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }}>
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>Theme</label>
          <button onClick={toggle} style={{ padding: '10px 20px', background: isDark ? '#00d9ff' : '#1a1a3e', color: isDark ? '#000' : '#fff' }}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </PageLayout>
  )
}