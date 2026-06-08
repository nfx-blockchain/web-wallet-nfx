import { useTheme } from '../hooks/useTheme'

export default function PageLayout({ title, children }: { title: string, children: React.ReactNode }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div style={{ 
      maxWidth: 800, margin: '40px auto', padding: 20,
      background: isDark ? '#1a1a3e' : '#fff',
      borderRadius: 12, border: `1px solid ${isDark ? '#333' : '#ddd'}`
    }}>
      <h2 style={{ marginBottom: 20, color: isDark ? '#00d9ff' : '#0066cc' }}>{title}</h2>
      {children}
    </div>
  )
}