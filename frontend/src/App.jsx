import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Header'

export default function App() {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <AppRoutes />
      </main>
    </>
  )
}
