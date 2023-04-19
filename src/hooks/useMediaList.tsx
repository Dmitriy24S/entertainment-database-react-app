import { CombinedMediaType } from '../types'
import useFetchData from './useFetchData'

// Fetch media list data
const useMediaList = (url: string) => {
  const { data: mediaData } = useFetchData(url, null)

  return { mediaData } as {
    mediaData: CombinedMediaType
  }
}

export default useMediaList
