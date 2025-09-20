import { io } from 'socket.io-client'

export let socket = null

export function connectSocket() {
  if (socket) return socket
  const url =
    import.meta.env.VITE_SOCKET_URL ||
    (import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace('/api', '')
      : 'http://localhost:8000')

  socket = io(url, {
    path: '/socket.io',
    transports: ['websocket']
  })

  return socket
}
