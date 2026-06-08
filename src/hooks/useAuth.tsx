import { createContext, useContext, useState, useEffect } from 'react'
import { NFXProvider } from 'id-nfx'

interface AuthContextType {
  user: { address?: string } | null
  loading: boolean
  login: (address: string, password: string) => Promise<void>
  register: (password: string) => Promise<void>
  logout: () => void
  connectExtension: () => Promise<void>
  provider: NFXProvider | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  connectExtension: async () => {},
  provider: null
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ address?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<NFXProvider | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('nfx-user')
    if (stored) setUser(JSON.parse(stored))
    const ext: any = (window as any).nfx
    if (ext?.request) setProvider(() => ext)
  }, [])

  const API = 'http://localhost:3002'

  const connectExtension = async () => {
    setLoading(true)
    const ext: any = (window as any).nfx
    if (ext?.request) {
      try {
        const accounts = await ext.request({ method: 'eth_requestAccounts' })
        const u = { address: accounts[0] }
        localStorage.setItem('nfx-user', JSON.stringify(u))
        setUser(u)
        setProvider(ext)
        return
      } catch {}
    }
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'mock' })
      })
      const data = await res.json()
      const u = { address: data.address }
      localStorage.setItem('nfx-user', JSON.stringify(u))
      setUser(u)
      setProvider(new NFXProvider({ rpc: 'http://localhost:27444' }))
    } catch {}
    setLoading(false)
  }

  const login = async (address: string, password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, password })
      })
      if (res.ok) {
        const data = await res.json()
        const u = { address: data.address }
        localStorage.setItem('nfx-user', JSON.stringify(u))
        setUser(u)
        setProvider(new NFXProvider({ rpc: 'http://localhost:27444' }))
      }
    } finally { setLoading(false) }
  }

  const register = async (password: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (res.ok) {
        const u = { address: data.address }
        localStorage.setItem('nfx-user', JSON.stringify(u))
        setUser(u)
        setProvider(new NFXProvider({ rpc: 'http://localhost:27444' }))
      }
    } finally { setLoading(false) }
  }

  const logout = () => {
    localStorage.removeItem('nfx-user')
    setUser(null)
    setProvider(null)
    window.location.assign('/landing')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, connectExtension, provider }}>
      {children}
    </AuthContext.Provider>
  )
}