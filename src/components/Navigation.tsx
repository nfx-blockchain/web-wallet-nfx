import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <nav>
      <Link to="/">Wallet</Link>
      <Link to="/send">Send</Link>
      <Link to="/receive">Receive</Link>
    </nav>
  )
}