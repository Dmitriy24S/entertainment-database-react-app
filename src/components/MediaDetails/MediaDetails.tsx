import { useLocation } from 'react-router-dom'

import Bookmark from '../Bookmark/Bookmark'
import Spinner from '../Spinner/Spinner'
import KeywordsList from './KeywordsList/KeywordsList'

import { useBookmarksContext, useHeaderContext } from '../../context/ContextProvider'
import useMediaDetails from '../../hooks/useMediaDetails'
import { getMovieDetailsApiUrl, getTVDetailsApiUrl } from '../../utils/getMediaApiUrl'
import { extractMediaInfoFromURL } from '../../utils/getMediaInfoFromURL'

import { MediaType } from '../../types'

import BackButton from './BackButton/BackButton'
import Cast from './Cast/Cast'
import styles from './MediaDetails.module.scss'
import Overview from './Overview/Overview'
import QuickInfo from './QuickInfo/QuickInfo'
import Score from './Score/Score'
import Title from './Title/Title'

const MediaDetails = () => {
  const { pathname } = useLocation()
  const { activeMenu } = useHeaderContext()
  const { addToBookmarks, checkInBookmarksStatus } = useBookmarksContext()
  const { mediaType, mediaId } = extractMediaInfoFromURL(pathname)

  const requestUrl =
    mediaType === MediaType.MOVIE
      ? getMovieDetailsApiUrl(mediaId)
      : getTVDetailsApiUrl(mediaId)

  const { mediaData, castData, userScore, mediaYear, releaseDate } = useMediaDetails(
    requestUrl,
    mediaType
  )

  if (!mediaData) {
    console.log('NO MEDIA DATA - RETURN')
    // return <h3>Loading</h3>
    return <Spinner />
  }

  return (
    mediaData && (
      <section className={styles.container}>
        {activeMenu && <BackButton />}
        <div className={styles.detailsContainer}>
          {/* Media poster */}
          <img
            src={`https://www.themoviedb.org/t/p/w440_and_h660_face${mediaData.poster_path}`}
            alt={`${
              mediaType === MediaType.MOVIE
                ? mediaData?.original_title
                : mediaData.original_name
            } poster`}
            className={styles.poster}
          />
          {/* Media info */}
          <div className={styles.details}>
            <Title mediaType={mediaType} mediaData={mediaData} mediaYear={mediaYear} />
            <QuickInfo
              mediaType={mediaType}
              mediaData={mediaData}
              releaseDate={releaseDate}
            />
            <div className={styles.interactiveContainer}>
              <Score userScore={userScore} />
              <Bookmark
                title={
                  checkInBookmarksStatus(mediaData) ? 'Remove bookmark' : 'Add bookmark'
                }
                isBookmarked={checkInBookmarksStatus(mediaData)}
                handleClick={() => addToBookmarks(mediaData)}
                fullPage
              />
            </div>
            <p className={styles.tagline}>{mediaData.tagline}</p>
            <Overview mediaData={mediaData} />
            <KeywordsList mediaType={mediaType} mediaId={mediaId} />
          </div>
        </div>
        {/* Media cast */}
        <Cast castData={castData?.cast} mediaType={mediaType} />
      </section>
    )
  )
}

export default MediaDetails
