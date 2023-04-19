import axios from 'axios'
import { useEffect, useState } from 'react'

// Fetch data on page load, popular movies, trending tv

const useFetchData = (url: string, initialValue: any) => {
  const [data, setData] = useState<any>(initialValue)
  // const [data, setData] = useState<
  //   CombinedMediaType[] | CombinedMediaType | CastDataType
  // >(initialValue)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (url.includes('bookmarks') || url.length === 0) {
      console.log('BOOKMARKS = NO FETCH - RETURNING')
      return
    }

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(url)

        // setData(response.data.results)
        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        alert(`fetchData error: ${error}`)
        console.log('fetchData error', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, isLoading }
}

export default useFetchData
