import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import PageLayout from '../components/PageLayout'

export default function Send() {
  const { provider } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!provider) return
    setSending(true)
    await provider.sendTransaction({ to, amount })
    setSending(false)
  }

  return (
    <PageLayout title="Send NFX">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <input placeholder="Recipient Address" value={to} onChange={e => setTo(e.target.value)}
          style={{ width: '100%', padding: 12, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }} />
        <input placeholder="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)}
          style={{ width: '100%', padding: 12, borderRadius: 4, background: isDark ? '#0f0f23' : '#f9f9f9', border: `1px solid ${isDark ? '#333' : '#ddd'}`, color: isDark ? '#fff' : '#000' }} />
        <button onClick={handleSend} disabled={sending} style={{ padding: 15, background: '#00d9ff', border: 'none', borderRadius: 4 }}>
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </PageLayout>
  )
}