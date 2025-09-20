// Hook para emitir la geolocalización del navegador al socket
import { useEffect, useRef } from 'react'
import { socket } from '../services/socket'

export default function useTracking({ room = 'main' } = {}) {
  const watchId = useRef(null)

  useEffect(() => {
    if (!navigator.geolocation) return

    watchId.current = navigator.geolocation.watchPosition(
      pos => {
        const payload = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          ts: new Date().toISOString(),
          room
        }
        try {
          socket && socket.emit('location:update', payload)
        } catch (e) {}
      },
      err => console.error('geo err', err),
      { enableHighAccuracy: true, maximumAge: 2000 }
    )

    return () => {
      if (watchId.current != null)
        navigator.geolocation.clearWatch(watchId.current)
    }
  }, [room])
}
