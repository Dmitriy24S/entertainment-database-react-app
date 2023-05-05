import axios from 'axios'
import { useEffect, useState } from 'react'
import { MediaType } from '../types'
import { getMediaVideoApiUrl } from '../utils/getMediaApiUrl'

export const useFetchTrailer = (mediaType: MediaType, mediaId: string) => {
  const [videoUrl, setVideoUrl] = useState('')
  const videoRequestUrl = getMediaVideoApiUrl(mediaType, mediaId)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoData = await axios.get(videoRequestUrl)
        console.log('videoData', videoData.data.results)

        const trailerUrlString =
          videoData.data.results.find((element: any) =>
            element.name.includes('Official Trailer')
          ) ||
          videoData.data.results.find((element: any) => element.name.includes('Trailer'))

        console.log('trailerUrlString', trailerUrlString)

        setVideoUrl(trailerUrlString.key)
      } catch (error) {
        console.log('fetchVideo error', error)
        alert('fetchVideo error')
      }
    }

    fetchVideo()
  }, [videoRequestUrl])

  return { videoUrl }
}
