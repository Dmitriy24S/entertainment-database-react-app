import { Tooltip } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import Spinner from '../../components/Spinner/Spinner'
import NavBookmarkIcon from '../../images/icon-nav-bookmark.svg'
import { AppContextType, MediaDataType, MediaEnum, MediaListDataType } from '../../types'
import { getApiKey } from '../../utils/getApiKey'
import { getMediaApiUrl } from '../../utils/getMediaApiUrl'
import { getMediaTitle } from '../../utils/getMediaTitle'
import { getUrlName } from '../../utils/getUrlName'
import styles from './MediaList.module.scss'

type Props = {
  // media: 'tv' | 'movie'
  // page: MediaEnum.TV | MediaEnum.MOVIE
  page: MediaEnum
}

const MediaList = ({ page }: Props) => {
  const { bookmarkedItems, addToBookmarks, checkInBookmarksStatus } = useContext(
    AppContext
  ) as AppContextType

  const [mediaData, setMediaData] = useState<MediaListDataType>()
  // const [mediaData, setMediaData] = useState<MovieListDataType[]>([])
  // const [mediaData, setMediaData] = useState([
  //   page === MediaEnum.BOOKMARKS ? bookmarkedItems : [],
  // ])
  const [selectedPage, setSelectedPage] = useState(1)
  const apiUrl = getMediaApiUrl(page)
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
    if (page !== MediaEnum.BOOKMARKS) {
      fetchMediaData()
    }
  }, [selectedPage, apiUrl, apiKey, page])

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [selectedPage])

  // Update selected page in pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value)
  }

  const data = page === MediaEnum.BOOKMARKS ? bookmarkedItems : mediaData?.results

  return (
    <section className='list'>
      <h1 className='list-name'>
        {page === MediaEnum.TV && 'Popular TV Shows'}
        {page === MediaEnum.MOVIE && 'Now playing movies'}
        {page === MediaEnum.BOOKMARKS && 'Bookmarks'}
      </h1>

      <div className={styles.mediaListContainer}>
        {data ? (
          <>
            <div className={styles.grid}>
              {data.map((item: MediaDataType, index: number) => {
                // media = on bookmarks page get media type & title from api for link route?
                // TODO: refactor?
                const media =
                  // item?.media_type === MediaEnum.TV ? MediaEnum.TV : MediaEnum.MOVIE
                  // ! why gone media_type not in api ?@?@?@
                  item.original_title ? MediaEnum.MOVIE : MediaEnum.TV
                // console.log({ media }) // {media: 'movie'}
                const mediaTitle = getMediaTitle(media, item)
                // console.log({ mediaTitle }) // {mediaTitle: 'Morbius'}
                // urlName = if have media title -> generate url for media details page
                // TODO: refactor?
                const urlName =
                  getMediaTitle(media, item) && getUrlName(getMediaTitle(media, item))
                const userScore = item?.vote_average * 10
                // console.log('item', item)

                return (
                  <article className={styles.mediaCard} key={item.id}>
                    {/* Bookmark button */}
                    {checkInBookmarksStatus(item) ? (
                      <Tooltip title='Remove bookmark'>
                        <button
                          onClick={() => addToBookmarks(item)}
                          // TODO: refactor bookmark / bookmark-btn--card ?
                          className='bookmark-btn bookmark-btn--card unbookmark'
                          aria-label='remove from bookmarks'
                        >
                          <img src={NavBookmarkIcon} alt='' />
                        </button>
                      </Tooltip>
                    ) : (
                      <Tooltip title='Bookmark'>
                        <button
                          onClick={() => addToBookmarks(item)}
                          className='bookmark-btn bookmark-btn--card'
                          aria-label='add bookmark this media'
                        >
                          <img src={NavBookmarkIcon} alt='' />
                        </button>
                      </Tooltip>
                    )}
                    <img
                      src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item?.poster_path}`}
                      alt=''
                      className={styles.mediaCardPoster}
                    />
                    <div className={styles.mediaInfo}>
                      <div className={styles.userScoreContainer}>
                        <CircularProgressbar
                          value={userScore}
                          text={`${userScore}%`}
                          background
                          styles={buildStyles({
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                            textSize: '1.3rem',
                            pathTransitionDuration: 0.5,
                            pathColor: `${
                              userScore > 65
                                ? '#2fd71d'
                                : userScore > 45
                                ? '#e6ff2a'
                                : '#de2b2b'
                            }`,
                            textColor: 'white',
                            trailColor: '#3f3e3e',
                            backgroundColor: '#100c29',
                          })}
                        />
                      </div>
                      <h4 className={styles.mediaTitle}>
                        <Link
                          to={`/${media}/${item.id}-${urlName}`}
                          state={[item.id, media]}
                        >
                          {/* Movies API */}
                          {/* {page === MediaEnum.MOVIE && item.original_title} */}
                          {/* TV Shows API */}
                          {/* {page === MediaEnum.TV && item.original_name} */}
                          {mediaTitle}
                        </Link>
                      </h4>
                      <p className={styles.mediaReleaseDate}>
                        {media === MediaEnum.MOVIE && item.release_date}
                        {media === MediaEnum.TV && item.first_air_date}
                        {/* {mediaTitle} */}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
            {/* No Bookmarks */}
            {/* // TODO: cleanup refactor code? */}
            {page === MediaEnum.BOOKMARKS && data.length === 0 && (
              <h4 className={styles.mediaListMessage}>Your bookmarks are empty.</h4>
            )}
            {/* Pagination */}
            {/* // TODO: pagination for bookmarks (update bookmarks state logic? ) */}
            {page !== MediaEnum.BOOKMARKS && mediaData && (
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
        ) : (
          // <h2>Loading</h2>
          <Spinner />
        )}
      </div>
    </section>
  )
}

export default MediaList
