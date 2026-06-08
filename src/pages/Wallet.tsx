import { useNFX } from '../hooks/useNFX'

export function Wallet() {
  const { balance, loading } = useNFX()
  return <div><h1>Balance: {loading ? '...' : balance}</h1></div>
}