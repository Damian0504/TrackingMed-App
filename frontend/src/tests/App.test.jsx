import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Smoke tests', () => {
  it('renders header', () => {
    renderWithRouter(<App />)
    expect(screen.getByText(/Home|Login/i)).toBeDefined()
  })
})
