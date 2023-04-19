import { apiBaseUrl } from '../const/apiBaseUrl'
import { MediaType } from '../types'
import { getApiKey } from './getApiKey'

const apiKey = getApiKey()

export const getMediaApiUrl = (media: MediaType) => {
  if (media === MediaType.TV) {
    return `${apiBaseUrl}/trending/tv/day?api_key=${apiKey}&language=en-US`
  }
  if (media === MediaType.MOVIE) {
    return `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US`
  }
  return ''
}

export const getMovieDetailsApiUrl = (mediaId: string) => {
  const detailsUrl = `${apiBaseUrl}/movie/${mediaId}?api_key=${apiKey}&language=en-US`
  const castUrl = `${apiBaseUrl}/movie/${mediaId}/credits?api_key=${apiKey}`
  return { detailsUrl, castUrl }
}

export const getTVDetailsApiUrl = (mediaId: string) => {
  const detailsUrl = `${apiBaseUrl}/tv/${mediaId}?api_key=${apiKey}&language=en-US`
  const castUrl = `${apiBaseUrl}/tv/${mediaId}/aggregate_credits?api_key=${apiKey}`
  return { detailsUrl, castUrl }
}
