import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

import { useBookmarksContext } from '../../context/ContextProvider'
import { getApiKey } from '../../utils/getApiKey'
import { apiBaseUrl } from '../../utils/getMediaApiUrl'
import { getUserScore } from '../../utils/getUserScore'
import Bookmark from '../Bookmark/Bookmark'
import MediaRatingCircularProgressBar from '../MediaRatingCircularProgressBar/MediaRatingCircularProgressBar'
import Spinner from '../Spinner/Spinner'

import {
  ActorInfoDataType,
  CastDataType,
  CombinedMediaType,
  MediaType,
  MovieDetailsGenresType,
} from '../../types'

import styles from './MediaDetails.module.scss'

const apiCastProfileImgUrl = 'https://www.themoviedb.org/t/p/w276_and_h350_face'
const apiKey = getApiKey()

const MediaDetails = () => {
  const { addToBookmarks, checkInBookmarksStatus } = useBookmarksContext()
  const [mediaData, setMediaData] = useState<CombinedMediaType>()
  const [castData, setCastData] = useState<CastDataType>()

  let navigate = useNavigate()

  // const { id } = useParams();
  // 338953-fantastic-beasts-the-secrets-of-dumbledore

  const location = useLocation()
  //   {
  //     "pathname": "/movie/315162-puss-in-boots-the-last-wish",
  //     "search": "",
  //     "hash": "",
  //     "state": [
  //         315162,
  //         "movie"
  //     ],
  //     "key": "8cip38jm"
  // }

  const { pathname } = location

  const { state }: any = useLocation() // 338953 - media id // array: (2) [92782, 'tv'] 0: 92782 1: "tv"
  // state: (2) [315162, 'movie']

  // const [mediaId, mediaType] = state  // ! when direct url -> state: null -> empty page, no state -> instead of useLocation state

  const extractMediaInfoFromURL = (pathname: string) => {
    const [mediaType, idString] = pathname.split('/').filter(Boolean) // split and filter out any empty strings // (2) ['movie', '315162-puss-in-boots-the-last-wish']
    // mediaType: movie
    // idString: 315162-puss-in-boots-the-last-wish
    const match = idString.match(/^\d+/) //  match media id number from url path, match one or more digits at the beginning of the string // match: ['315162', index: 0, input: '315162-puss-in-boots-the-last-wish', groups: undefined]

    const mediaId = match ? match[0] : null // mediaId: 315162
    return { mediaType, mediaId }
  }

  const { mediaType, mediaId } = extractMediaInfoFromURL(pathname)

  let userScore = mediaData ? getUserScore(mediaData) : 0

  // Fetch media/cast data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiMediaData = await axios.get(
          `${apiBaseUrl}/${mediaType}/${mediaId}?api_key=${apiKey}&language=en-US`
        )
        setMediaData(apiMediaData.data)
        const apiCreditsData = await axios.get(
          `${apiBaseUrl}/${mediaType}/${mediaId}/${
            mediaType === MediaType.MOVIE ? 'credits' : 'aggregate_credits'
          }?api_key=${apiKey}`
        )
        setCastData(apiCreditsData.data)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData()
  }, [state, mediaId, mediaType])

  const calcRuntime = (minutesRuntime: number) => {
    const hours = minutesRuntime / 60
    const leftover = hours - Math.floor(hours)
    const minutes = Math.round(leftover * 60)
    return `${Math.floor(hours)}h ${minutes}m` // 1h 45m
  }

  let movieYear
  if (mediaData) {
    if (mediaType === MediaType.MOVIE) {
      movieYear = mediaData?.release_date.split('-') // ['2022', '03', '30']
    }
    if (mediaType === MediaType.TV) {
      movieYear = mediaData?.first_air_date.split('-') // ['2022', '06', '08']
    }
  }
  let releaseDate
  if (movieYear) {
    releaseDate = `${movieYear[1]}/${movieYear[2]}/${movieYear[0]}` // 2022/03/30
  }

  if (!mediaData) {
    // return <h3>Loading</h3>
    return <Spinner />
  }

  console.log('mediaData:', mediaData)

  return (
    mediaData && (
      <section className={styles.container}>
        <button
          onClick={() => {
            navigate(-1)
          }}
          title='Go back'
          className={styles.returnButton}
        >
          <IoMdArrowBack />
        </button>
        <div className={styles.detailsContainer}>
          {mediaData && (
            <>
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
                      {mediaData.genres.map(
                        (genre: MovieDetailsGenresType, index: number) =>
                          index !== mediaData.genres.length - 1
                            ? genre.name + ', '
                            : genre.name
                      )}
                    </span>
                  </li>
                  <li className={styles.runtime}>
                    {mediaType === MediaType.MOVIE
                      ? calcRuntime(mediaData.runtime)
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
                        checkInBookmarksStatus(mediaData)
                          ? 'Remove bookmark'
                          : 'Add bookmark'
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
            </>
          )}
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
