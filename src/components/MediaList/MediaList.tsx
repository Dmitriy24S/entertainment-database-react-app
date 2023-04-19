import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import React, { useEffect, useState } from 'react'

import Spinner from '../../components/Spinner/Spinner'
import MediaCardLarge from '../MediaCardLarge/MediaCardLarge'

import { useBookmarksContext } from '../../context/ContextProvider'
import useFetchData from '../../hooks/useFetchData'
import { getMediaApiUrl } from '../../utils/getMediaApiUrl'
import { getMediaTitle } from '../../utils/getMediaTitle'
import { getUrlName } from '../../utils/getUrlName'
import { getUserScore } from '../../utils/getUserScore'

import { CombinedMediaType, MediaListDataType, MediaType } from '../../types'

import sharedStyles from '../../shared/sharedStyles.module.scss'
import styles from './MediaList.module.scss'

type Props = {
  pageMediaType: MediaType
}

export const initialMediaDataState: MediaListDataType = {
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
  console.count('MediaList')

  const isBookmarksPage = pageMediaType === MediaType.BOOKMARKS
  const { bookmarkedItems } = useBookmarksContext()

  const [selectedPage, setSelectedPage] = useState(1)
  const requestUrl = getMediaApiUrl(pageMediaType) // '' for bookmarks page
  // const requestUrl = pageMediaType === MediaType.MOVIE ? movieListUrl : tvListUrl
  const { data: mediaData }: { data: MediaListDataType } = useFetchData(requestUrl, null)
  // const data = isBookmarksPage ? bookmarkedItems : mediaData.results // ! TypeError: Cannot read properties of null (reading 'results')
  const data = isBookmarksPage ? bookmarkedItems : mediaData ? mediaData.results : []

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [selectedPage])

  // Update selected page in pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value)
  }

  if (!mediaData && pageMediaType !== MediaType.BOOKMARKS) {
    // return null
    return <Spinner />
  }

  if (!data && pageMediaType === MediaType.BOOKMARKS) {
    return <h4 className={styles.mediaListMessage}>Your bookmarks are empty.</h4>
  }

  return (
    <section className={sharedStyles.container}>
      <h1 className={sharedStyles.header}>
        {pageMediaType === MediaType.TV && 'Popular TV Shows'}
        {pageMediaType === MediaType.MOVIE && 'Now playing movies'}
        {pageMediaType === MediaType.BOOKMARKS && 'Bookmarks'}
      </h1>

      <div className={styles.content}>
        <>
          <div className={styles.grid}>
            {data.map((item: CombinedMediaType) => {
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
      </div>
    </section>
  )
}

export default MediaList
