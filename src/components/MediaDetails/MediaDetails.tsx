import { IoMdArrowBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

import Bookmark from '../Bookmark/Bookmark'
import MediaRatingCircularProgressBar from '../MediaRatingCircularProgressBar/MediaRatingCircularProgressBar'
import Spinner from '../Spinner/Spinner'

import { apiCastProfileImgUrl } from '../../const/apiCastProfileImgUrl'
import { useBookmarksContext, useHeaderContext } from '../../context/ContextProvider'
import useMediaDetails from '../../hooks/useMediaDetails'
import { getMovieDetailsApiUrl, getTVDetailsApiUrl } from '../../utils/getMediaApiUrl'
import { extractMediaInfoFromURL } from '../../utils/getMediaInfoFromURL'
import { getRuntime } from '../../utils/getRuntime'

import { ActorInfoDataType, MediaType, MovieDetailsGenresType } from '../../types'

import styles from './MediaDetails.module.scss'

const MediaDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const { activeMenu } = useHeaderContext()
  const { addToBookmarks, checkInBookmarksStatus } = useBookmarksContext()

  const { mediaType, mediaId } = extractMediaInfoFromURL(pathname)

  const requestUrl =
    mediaType === MediaType.MOVIE
      ? getMovieDetailsApiUrl(mediaId)
      : getTVDetailsApiUrl(mediaId)

  const { mediaData, castData, userScore, movieYear, releaseDate } = useMediaDetails(
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
        {activeMenu && (
          <button
            onClick={() => {
              navigate(-1)
            }}
            title='Go back'
            className={styles.returnButton}
          >
            <IoMdArrowBack />
          </button>
        )}
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
            <h1 className={styles.title}>
              {mediaType === MediaType.MOVIE
                ? mediaData.original_title
                : mediaData.original_name}
              <span className={styles.year}>{` (${movieYear && movieYear[0]})`}</span>
            </h1>
            <ul className={styles.shortList}>
              <li>{releaseDate}</li>
              <li className={styles.genres}>
                <span>
                  {mediaData.genres.map((genre: MovieDetailsGenresType, index: number) =>
                    index !== mediaData.genres.length - 1 ? genre.name + ', ' : genre.name
                  )}
                </span>
              </li>
              <li className={styles.runtime}>
                {mediaType === MediaType.MOVIE
                  ? getRuntime(mediaData.runtime)
                  : `${mediaData.last_episode_to_air.runtime}min`}
                {/* : `${mediaData.episode_run_time[0]}min`} */}
              </li>
            </ul>
            <div className={styles.interactiveContainer}>
              <div className={styles.userRating}>
                {/* Media user score rating circle */}
                <div className={styles.ratingCircleContainer}>
                  <MediaRatingCircularProgressBar userScore={userScore} />
                </div>
                <h5 className={styles.userRatingTitle}>
                  User <br /> Score
                </h5>
                <Bookmark
                  title={
                    checkInBookmarksStatus(mediaData) ? 'Remove bookmark' : 'Add bookmark'
                  }
                  isBookmarked={checkInBookmarksStatus(mediaData)}
                  handleClick={() => addToBookmarks(mediaData)}
                  fullPage
                />
              </div>
            </div>
            <p className={styles.tagline}>{mediaData.tagline}</p>
            <div className={styles.overview}>
              <h5 className={styles.overviewTitle}>Overview</h5>
              <p className={styles.overviewDescription}>{mediaData.overview}</p>
            </div>
          </div>
        </div>
        {/* Media cast */}
        <section className={styles.castContainer}>
          <h3 className={styles.castTitle}>The Cast</h3>
          <div className={styles.cast}>
            {castData?.cast.map((person: ActorInfoDataType, index: number) => {
              if (index < 8) {
                return (
                  <div className={styles.castCard} key={person.id}>
                    <img src={`${apiCastProfileImgUrl}${person.profile_path}`} alt='' />
                    <div className={styles.roleContainer}>
                      <h4 className={styles.actorName}>{person.name}</h4>
                      <p className={styles.characterName}>
                        {mediaType === MediaType.MOVIE
                          ? person.character
                          : person?.roles?.map((role, index) =>
                              index !== person.roles.length - 1
                                ? role.character + ', '
                                : role.character
                            )}
                      </p>
                    </div>
                  </div>
                )
              } else {
                return null
              }
            })}
          </div>
        </section>
      </section>
    )
  )
}

export default MediaDetails
