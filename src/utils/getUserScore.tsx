import { MediaDataType, MediaDetailType } from '../types'

export const getUserScore = (mediaData: MediaDataType | MediaDetailType) => {
  return Number((mediaData.vote_average * 10).toFixed())
}
