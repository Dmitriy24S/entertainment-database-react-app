import { MediaType } from '../types'

export const apiBaseUrl = 'https://api.themoviedb.org/3'

export const getMediaApiUrl = (media: MediaType) => {
  if (media.toLocaleLowerCase() === MediaType.TV) {
    return `${apiBaseUrl}/trending/tv/day?api_key=`
  }
  if (media.toLocaleLowerCase() === MediaType.MOVIE) {
    return `${apiBaseUrl}/movie/now_playing?api_key=`
  }
  return null
}
