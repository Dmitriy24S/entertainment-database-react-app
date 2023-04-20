import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MockAppContextProvider } from '../../mocks/mockContext'
import Header from './Header'

describe('Header', () => {
  it('should render Home and TV link with correct URL', () => {
    render(
      <MockAppContextProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MockAppContextProvider>
    )

    // const tvLink = screen.getByLabelText('Tv Shows')
    const tvLink = screen.getByLabelText(/tv shows/i) // case-insensitive
    expect(tvLink).toHaveAttribute('href', '/tv')

    const homeLink = screen.getByLabelText(/home/i)
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
