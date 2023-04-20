import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  it('should render Home and TV link with correct URL', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    // const tvLink = screen.getByLabelText('Tv Shows')
    const tvLink = screen.getByLabelText(/tv shows/i) // case-insensitive
    expect(tvLink).toHaveAttribute('href', '/tv')

    const homeLink = screen.getByLabelText(/home/i)
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
