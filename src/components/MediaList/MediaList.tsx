import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../App'
import { AppContextType, MediaDataType, MediaListDataType, MediaType } from '../../types'

import Spinner from '../../components/Spinner/Spinner'
import MediaCardLarge from '../MediaCardLarge/MediaCardLarge'

import { getApiKey } from '../../utils/getApiKey'
import { getMediaApiUrl } from '../../utils/getMediaApiUrl'
import { getMediaTitle } from '../../utils/getMediaTitle'
import { getUrlName } from '../../utils/getUrlName'

import sharedStyles from '../../shared/sharedStyles.module.scss'
import { getUserScore } from '../../utils/getUserScore'
import styles from './MediaList.module.scss'

type Props = {
  pageMediaType: MediaType
}

const initialMediaDataState: MediaListDataType = {
  results: [],
  page: 1,
  dates: {
    maximum: '',
    minimum: '',
  },
  total_pages: 1,
  total_results: 1,
}

const MediaList = ({ pageMediaType }: Props) => {
  const { bookmarkedItems } = useContext(AppContext) as AppContextType

  const [mediaData, setMediaData] = useState<MediaListDataType>(initialMediaDataState)
  const [selectedPage, setSelectedPage] = useState(1)
  const apiUrl = getMediaApiUrl(pageMediaType)
  const apiKey = getApiKey()

  // Fetch now playing movie / popular tv shows list on page load
  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const apiPopularTvShows = await axios.get(
          `${apiUrl}${apiKey}&language=en-US&page=${selectedPage}`
        )
        setMediaData(apiPopularTvShows.data)
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    // if not on bookmarks page -> fetch data
    if (pageMediaType !== MediaType.BOOKMARKS) {
      fetchMediaData()
    }
  }, [selectedPage, apiUrl, apiKey, pageMediaType])

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [selectedPage])

  // Update selected page in pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value)
  }

  const data = pageMediaType === MediaType.BOOKMARKS ? bookmarkedItems : mediaData.results

  return (
    <section className={sharedStyles.container}>
      <h1 className={sharedStyles.header}>
        {pageMediaType === MediaType.TV && 'Popular TV Shows'}
        {pageMediaType === MediaType.MOVIE && 'Now playing movies'}
        {pageMediaType === MediaType.BOOKMARKS && 'Bookmarks'}
      </h1>

      <div className={styles.content}>
        {/* No Bookmarks */}
        {pageMediaType === MediaType.BOOKMARKS && data.length === 0 && (
          <h4 className={styles.mediaListMessage}>Your bookmarks are empty.</h4>
        )}
        {/* Loading */}
        {pageMediaType !== MediaType.BOOKMARKS && data.length === 0 && <Spinner />}
        {/* Data */}
        {data.length > 0 && (
          <>
            <div className={styles.grid}>
              {data.map((item: MediaDataType) => {
                const media = item.original_title ? MediaType.MOVIE : MediaType.TV // media = on bookmarks page get media type & title from api for link route?
                const mediaTitle = getMediaTitle(media, item)
                const urlName =
                  getMediaTitle(media, item) && getUrlName(getMediaTitle(media, item)) // urlName = if have media title -> generate url for media details page
                const userScore = getUserScore(item)

                return (
                  <MediaCardLarge
                    key={item.id}
                    item={item}
                    userScore={userScore}
                    media={media}
                    urlName={urlName}
                    mediaTitle={mediaTitle}
                  />
                )
              })}
            </div>

            {/* Pagination */}
            {/* // TODO: pagination for bookmarks (update bookmarks state logic? ) */}
            {/* {page !== MediaType.BOOKMARKS && mediaData && ( */}
            {pageMediaType !== MediaType.BOOKMARKS && (
              <Stack spacing={2} className={styles.pagination}>
                <Pagination
                  count={
                    mediaData.total_pages > 500 ? 500 : mediaData.total_pages
                    // api limit pages to 500
                  }
                  page={mediaData.page}
                  onChange={handleChange}
                />
              </Stack>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default MediaList
