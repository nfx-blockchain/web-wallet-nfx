import { useEffect, useState } from 'react'
import { NFXProvider } from 'id-nfx'
import { useAuth } from './useAuth'

export function useNFX() {
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    const provider = new NFXProvider()
    provider.getBalance(user.address).then(setBalance).finally(() => setLoading(false))
  }, [user])

  return { balance, loading }
}