const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('wallets.db')
db.exec(`CREATE TABLE IF NOT EXISTS wallets (address TEXT PRIMARY KEY, privateKey TEXT, passwordHash TEXT, createdAt TEXT)`)

const RPC_URL = process.env.NFX_RPC || 'http://localhost:27444'
const RPC_USER = process.env.NFX_USER || 'test'
const RPC_PASS = process.env.NFX_PASS || 'test123'
const BACKEND_PORT = process.env.PORT || 3002
let USE_MOCK = false

async function rpcCall(method, params = []) {
  try {
    const res = await fetch(RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(RPC_USER + ':' + RPC_PASS) },
      body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params })
    })
    return res.json()
  } catch {
    USE_MOCK = true
    return mockRpc(method, params)
  }
}

function mockRpc(method, params) {
  const addr = 'NFX' + Math.random().toString(36).slice(2, 36).toUpperCase()
  if (method === 'getnewaddress') return Promise.resolve({ result: addr })
  if (method === 'dumpprivkey') return Promise.resolve({ result: 'K' + addr.slice(3) })
  if (method === 'getbalance') return Promise.resolve({ result: '100.00' })
  return Promise.resolve({ result: null })
}

app.post('/register', async (req, res) => {
  const { password } = req.body
  const key = await rpcCall('getnewaddress')
  const privKey = await rpcCall('dumpprivkey', [key.result])
  const hash = require('crypto').createHash('sha256').update(password).digest('hex')
  db.run('INSERT OR REPLACE INTO wallets (address, privateKey, passwordHash, createdAt) VALUES (?, ?, ?, ?)',
    [key.result, privKey.result, hash, new Date().toISOString()])
  res.json({ address: key.result, mock: USE_MOCK })
})

app.post('/login', async (req, res) => {
  const { address, password } = req.body
  const hash = require('crypto').createHash('sha256').update(password).digest('hex')
  db.get('SELECT * FROM wallets WHERE address = ? AND passwordHash = ?', [address, hash], (err, row) => {
    if (row) res.json({ address: row.address, mock: USE_MOCK })
    else res.status(401).json({ error: 'Invalid credentials' })
  })
})

app.get('/balance/:address', async (req, res) => {
  const bal = await rpcCall('getbalance', [req.params.address])
  res.json({ balance: bal.result })
})

app.listen(BACKEND_PORT, () => console.log(`Backend on :${BACKEND_PORT} ${USE_MOCK ? '(mock mode)' : ''}`))