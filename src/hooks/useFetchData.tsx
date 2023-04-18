import axios from 'axios'
import { useEffect, useState } from 'react'

import { getApiKey } from '../utils/getApiKey'
import { getMediaApiUrl } from '../utils/getMediaApiUrl'

import { CombinedMediaType, MediaType } from '../types'

const apiKey = getApiKey()
const apiMovieUrl = getMediaApiUrl(MediaType.MOVIE)
const apiTvUrl = getMediaApiUrl(MediaType.TV)

// Fetch data on page load, popular movies, trending tv
const useFetchData = (mediaType: string, initialValue = []) => {
  const [data, setData] = useState<CombinedMediaType[]>(initialValue)
  const mediaUrl = mediaType === MediaType.MOVIE ? apiMovieUrl : apiTvUrl

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${mediaUrl}${apiKey}&language=en-US&page=1`)

        setData(response.data.results)
      } catch (error) {
        alert(`fetchData error: ${error}`)
        console.log('fetchData error', error)
      }
    }

    fetchData()
  }, [mediaUrl])

  return data
}

export default useFetchData
