import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MockAppContextProvider } from '../../mocks/mockContext'
import { mockMediaItemData } from '../../mocks/mockData'
import { MediaType } from '../../types'
import MediaCardLarge from './MediaCardLarge'

describe('MediaCardLarge', () => {
  it('should render link with the correct URL', () => {
    const urlName = 'urlName'
    const mediaTitle = 'mediaTitle'

    render(
      <MockAppContextProvider>
        <MemoryRouter>
          <MediaCardLarge
            item={mockMediaItemData}
            userScore={0}
            media={MediaType.MOVIE} // media='movie'
            urlName={urlName}
            mediaTitle={mediaTitle}
          />
        </MemoryRouter>
      </MockAppContextProvider>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/movie/${mockMediaItemData.id}-${urlName}`)
  })
})
