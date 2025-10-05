import React from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

export default function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  if (loadError) return <div>Error cargando mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  const center = { lat: -34.6037, lng: -58.3816 } // Buenos Aires ejemplo

  return (
    <div style={{ height: '70vh' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  )
}
