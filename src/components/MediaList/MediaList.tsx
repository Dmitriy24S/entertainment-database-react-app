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
import { AppContextType, MediaDataType, MediaEnum, MovieListDataType } from '../../types'
import { getApiKey } from '../../utils/getApiKey'
import { getMediaApiUrl } from '../../utils/getMediaApiUrl'
import { getMediaTitle } from '../../utils/getMediaTitle'
import { getUrlName } from '../../utils/getUrlName'
import styles from './MediaList.module.scss'

type Props = {
  // media: 'tv' | 'movie'
  media: MediaEnum.TV | MediaEnum.MOVIE
}

const MediaList = ({ media }: Props) => {
  const { addToBookmarks, checkInBookmarksStatus } = useContext(
    AppContext
  ) as AppContextType
  const [mediaData, setMediaData] = useState<MovieListDataType>()
  const [selectedPage, setSelectedPage] = useState(1)
  const apiUrl = getMediaApiUrl(media)
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
    fetchMediaData()
  }, [selectedPage, apiUrl, apiKey])

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [selectedPage])

  // Update selected page in pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value)
  }

  return (
    <section className='list'>
      <h1 className='list-name'>
        {media === MediaEnum.TV && 'Popular TV Shows'}
        {media === MediaEnum.MOVIE && 'Now playing movies'}
      </h1>

      <div className={styles.mediaListContainer}>
        {mediaData ? (
          <>
            {mediaData.results.map((item: MediaDataType, index: number) => {
              const urlName =
                getMediaTitle(media, item) && getUrlName(getMediaTitle(media, item)) // TODO: refactor?
              const userScore = item?.vote_average * 10
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
                        {media === MediaEnum.MOVIE && item.original_title}
                        {/* TV Shows API */}
                        {media === MediaEnum.TV && item.original_name}
                      </Link>
                    </h4>
                    <p className={styles.mediaReleaseDate}>
                      {media === MediaEnum.MOVIE && item.release_date}
                      {media === MediaEnum.TV && item.first_air_date}
                    </p>
                  </div>
                </article>
              )
            })}
            {/* Pagination */}
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
