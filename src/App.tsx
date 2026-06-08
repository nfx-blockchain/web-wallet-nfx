import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Wallet } from './pages/Wallet'
import { Send } from './pages/Send'
import { Receive } from './pages/Receive'
import { Navigation } from './components/Navigation'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Wallet />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}