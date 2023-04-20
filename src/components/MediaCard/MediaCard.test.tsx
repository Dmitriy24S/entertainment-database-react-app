import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { MockAppContextProvider } from '../../mocks/mockContext'
import { mockMediaItemData } from '../../mocks/mockData'
import { MediaType } from '../../types'
import MediaCard from './MediaCard'

describe('MediaCard', () => {
  it('should render link with the correct URL', () => {
    const title = 'title'
    const urlName = 'urlName'

    render(
      <MockAppContextProvider>
        <MemoryRouter>
          <MediaCard
            mediaItem={mockMediaItemData}
            urlName={urlName}
            title={title}
            mediaType={MediaType.MOVIE} // media='movie'
          />
        </MemoryRouter>
      </MockAppContextProvider>
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/movie/${mockMediaItemData.id}-${urlName}`)
  })
})
