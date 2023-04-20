import { CombinedMediaType } from '../types'

export const mockMediaItemData: CombinedMediaType = {
  adult: false,
  backdrop_path: '/backdrop.jpg',
  genre_ids: [18, 27],
  id: 12345,
  original_title: 'Original Title',
  original_language: 'en',
  original_name: 'Original Name',
  overview: 'This is an overview of the media type.',
  popularity: 7.8,
  poster_path: '/poster.jpg',
  release_date: '2022-01-01',
  title: 'The Movie Title',
  video: false,
  vote_average: 8.5,
  vote_count: 1234,
  tagline: 'This is the tagline of the movie.',
  runtime: 120,
  genres: [
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 27,
      name: 'Horror',
    },
  ],
  name: 'The TV Show Name',
  media_type: 'tv',
  first_air_date: '2022-01-01',
  last_episode_to_air: {
    runtime: '60',
  },
  origin_country: ['US'],
}
