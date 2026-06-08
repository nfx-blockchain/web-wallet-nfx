import { useState, useEffect, createContext, useContext } from 'react'

const ThemeContext = createContext({ theme: 'dark', toggle: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}