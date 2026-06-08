import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import PageLayout from '../components/PageLayout'

export default function Receive() {
  const { user } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <PageLayout title="Receive NFX">
      {user ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 10, color: '#888' }}>Your Address</p>
          <code style={{ background: isDark ? '#0f0f23' : '#f9f9f9', padding: 15, borderRadius: 4, display: 'block', marginBottom: 15, fontSize: 14, wordBreak: 'break-all' }}>
            {user.address}
          </code>
          <p>Share this address to receive NFX</p>
        </div>
      ) : (
        <p>Please connect your wallet first</p>
      )}
    </PageLayout>
  )
}