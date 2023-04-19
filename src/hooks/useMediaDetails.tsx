import { CastDataType, CombinedMediaType, MediaType } from '../types'
import { getUserScore } from '../utils/getUserScore'
import useFetchData from './useFetchData'

interface RequestUrlType {
  detailsUrl: string
  castUrl: string
}

// Fetch media/cast data
const useMediaDetails = (requestUrl: RequestUrlType, mediaType: MediaType) => {
  const { data: mediaData } = useFetchData(requestUrl.detailsUrl, null)
  const { data: castData } = useFetchData(requestUrl.castUrl, null)

  const userScore = mediaData ? getUserScore(mediaData) : 0

  let movieYear
  if (mediaData) {
    if (mediaType === MediaType.MOVIE) {
      movieYear = mediaData.release_date.split('-') // ['2022', '03', '30']
    }
    if (mediaType === MediaType.TV) {
      movieYear = mediaData.first_air_date.split('-') // ['2022', '06', '08']
    }
  }

  let releaseDate
  if (movieYear) {
    releaseDate = `${movieYear[1]}/${movieYear[2]}/${movieYear[0]}` // 2022/03/30
  }

  return { mediaData, castData, userScore, movieYear, releaseDate } as {
    mediaData: CombinedMediaType
    castData: CastDataType
    userScore: number
    movieYear: string
    releaseDate: string
  }
}

export default useMediaDetails
