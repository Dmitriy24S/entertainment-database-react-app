import { CombinedMediaType, MediaType } from '../types'

export const getMediaTitle = (media: MediaType, item: CombinedMediaType) => {
  // return movie or tv show name:
  return media === MediaType.MOVIE ? item.title : item.name
}
