import { MediaDataType, MediaEnum } from '../types'

export const getMediaTitle = (media: MediaEnum, item: MediaDataType) => {
  // return movie or tv show name:
  return media === MediaEnum.MOVIE ? item.title : item.original_name
}
