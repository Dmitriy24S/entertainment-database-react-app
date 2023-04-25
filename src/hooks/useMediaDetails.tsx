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

  let mediaYear
  if (mediaData) {
    if (mediaType === MediaType.MOVIE) {
      mediaYear = mediaData.release_date.split('-') // ['2022', '03', '30']
    }
    if (mediaType === MediaType.TV) {
      mediaYear = mediaData.first_air_date.split('-') // ['2022', '06', '08']
    }
  }

  let releaseDate
  if (mediaYear) {
    releaseDate = `${mediaYear[1]}/${mediaYear[2]}/${mediaYear[0]}` // 2022/03/30
  }

  return { mediaData, castData, userScore, mediaYear, releaseDate } as {
    mediaData: CombinedMediaType
    castData: CastDataType
    userScore: number
    mediaYear: string
    releaseDate: string
  }
}

export default useMediaDetails
