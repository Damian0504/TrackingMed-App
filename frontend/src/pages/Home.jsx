import React from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Bienvenido{user ? `, ${user.name}` : ''}</h1>
      <p>Página principal (MVP)</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}
