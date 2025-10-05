import React, { useEffect, useState } from 'react'
import { connectSocket, socket } from '../services/socket'

export default function Tracking() {
  const [connected, setConnected] = useState(false)
  const [positions, setPositions] = useState([])

  useEffect(() => {
    connectSocket()
    socket.on('connect', () => setConnected(true))
    socket.on('location:update', loc => {
      setPositions(prev => [...prev, loc])
    })
    return () => {
      try {
        socket.off('location:update')
      } catch {}
    }
  }, [])

  return (
    <div>
      <h2>Tracking en tiempo real</h2>
      <p>Socket conectado: {connected ? 'sí' : 'no'}</p>
      <ol>
        {positions
          .slice()
          .reverse()
          .map((p, i) => (
            <li key={i}>
              [{p.lat.toFixed(5)}, {p.lng.toFixed(5)}] — {p.ts}
            </li>
          ))}
      </ol>
    </div>
  )
}
