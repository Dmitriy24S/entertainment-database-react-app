import { MediaEnum } from '../types'

export const getMediaApiUrl = (media: MediaEnum.MOVIE | MediaEnum.TV) => {
  if (media.toLocaleLowerCase() === MediaEnum.TV) {
    return 'https://api.themoviedb.org/3/tv/popular?api_key='
  }
  if (media.toLocaleLowerCase() === MediaEnum.MOVIE) {
    return 'https://api.themoviedb.org/3/movie/now_playing?api_key='
  }
  return null
}
