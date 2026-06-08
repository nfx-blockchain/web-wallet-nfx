import { useState } from 'react'

export function Send() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  return (
    <div>
      <h2>Send NFX</h2>
      <input placeholder="To" value={to} onChange={e => setTo(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button>Send</button>
    </div>
  )
}