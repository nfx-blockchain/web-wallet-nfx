import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Send from './pages/Send'
import Receive from './pages/Receive'
import Landing from './pages/Landing'
import Navigation from './components/Navigation'
import { RequireAuth } from './components/RequireAuth'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="/send" element={<RequireAuth><Send /></RequireAuth>} />
          <Route path="/receive" element={<RequireAuth><Receive /></RequireAuth>} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}