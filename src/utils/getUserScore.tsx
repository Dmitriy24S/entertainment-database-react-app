import { CombinedMediaType } from '../types'

export const getUserScore = (mediaData: CombinedMediaType) => {
  return Number((mediaData.vote_average * 10).toFixed())
}
