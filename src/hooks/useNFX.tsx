import { useEffect, useState } from 'react'
import { NFXProvider } from 'id-nfx'

export function useNFX() {
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const provider = new NFXProvider()
    provider.getBalance('').then(setBalance).finally(() => setLoading(false))
  }, [])

  return { balance, loading }
}