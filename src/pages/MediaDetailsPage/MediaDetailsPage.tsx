import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { IoMdArrowBack } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '../../App'
import NavBookmarkIcon from '../../images/icon-nav-bookmark.svg'
import {
  ActorInfoDataType,
  AppContextType,
  CastDataType,
  MediaDetailType,
  MediaEnum,
  MovieDetailsGenresType,
} from '../../types'
import './MediaDetailsPage.scss'

const MediaDetailsPage = () => {
  const { addToBookmarks, checkInBookmarksStatus } = useContext(
    AppContext
  ) as AppContextType
  const [mediaData, setMediaData] = useState<MediaDetailType>()
  const [castData, setCastData] = useState<CastDataType>()

  // const { id } = useParams();
  // 338953-fantastic-beasts-the-secrets-of-dumbledore

  const { state }: any = useLocation() // 338953 - media id // array: (2) [92782, 'tv'] 0: 92782 1: "tv"
  const [mediaId, mediaType] = state

  let userScore = 0
  if (mediaData) {
    userScore = mediaData?.vote_average * 10
  }
  const apiUrl = 'https://api.themoviedb.org/3'
  const apiKey = 'b0574de2203f781e1f1bc82abcf3cd8d'
  const apiCastProfileImgUrl = 'https://www.themoviedb.org/t/p/w276_and_h350_face'

  // Fetch media/cast data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiMediaData = await axios.get(
          `${apiUrl}/${mediaType}/${mediaId}?api_key=${apiKey}&language=en-US`
        )
        setMediaData(apiMediaData.data)
        const apiCreditsData = await axios.get(
          `${apiUrl}/${mediaType}/${mediaId}/${
            mediaType === MediaEnum.MOVIE ? 'credits' : 'aggregate_credits'
          }?api_key=${apiKey}`
        )
        setCastData(apiCreditsData.data)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const calcRuntime = (minutesRuntime: number) => {
    let hours = minutesRuntime / 60
    let leftover = hours - Math.floor(hours)
    let minutes = Math.round(leftover * 60)
    return `${Math.floor(hours)}h ${minutes}m` // 1h 45m
  }

  let movieYear
  if (mediaData) {
    if (mediaType === MediaEnum.MOVIE) {
      movieYear = mediaData?.release_date.split('-') // ['2022', '03', '30']
    }
    if (mediaType === MediaEnum.TV) {
      movieYear = mediaData?.first_air_date.split('-') // ['2022', '06', '08']
    }
  }
  let releaseDate
  if (movieYear) {
    releaseDate = `${movieYear[1]}/${movieYear[2]}/${movieYear[0]}` // 2022/03/30
  }

  return mediaData ? (
    <>
      <Link to='/' className='return-btn'>
        <IoMdArrowBack />
      </Link>
      <section className='media-container'>
        {mediaData && (
          <>
            {/* Media poster */}
            <img
              src={`https://www.themoviedb.org/t/p/w440_and_h660_face${mediaData?.poster_path}`}
              alt={`${mediaData?.original_title} poster`}
              className='media-poster-full'
            />
            {/* Media info */}
            <div className='media-info'>
              <h1 className='media-title'>
                {mediaType === MediaEnum.MOVIE
                  ? mediaData?.original_title
                  : mediaData.original_name}
                <span className='media-year'>{` (${movieYear && movieYear[0]})`}</span>
              </h1>
              <ul className='short-list'>
                <li>{releaseDate}</li>
                <li>
                  <span className='genres'>
                    {mediaData.genres.map(
                      (genre: MovieDetailsGenresType, index: number) =>
                        index !== mediaData.genres.length - 1
                          ? genre.name + ', '
                          : genre.name
                    )}
                  </span>
                </li>
                <li className='runtime'>
                  {mediaType === MediaEnum.MOVIE
                    ? calcRuntime(mediaData.runtime)
                    : `${mediaData.episode_run_time[0]}min`}
                </li>
              </ul>
              <div className='media-interaction-menu'>
                <div className='media-user-rating'>
                  {/* Media user score rating circle */}
                  <div className='user-score-container'>
                    <CircularProgressbar
                      value={userScore}
                      text={`${userScore.toFixed()}%`}
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
                        backgroundColor: '#0a071d',
                      })}
                    />
                  </div>
                  <h5 className='user-rating-title'>
                    User <br /> Score
                  </h5>
                  {/* Bookmark button */}
                  {checkInBookmarksStatus(mediaData) ? (
                    <button
                      onClick={() => addToBookmarks(mediaData)}
                      className='bookmark-btn unbookmark'
                      aria-label='remove from bookmarks'
                    >
                      <img src={NavBookmarkIcon} alt='' />
                    </button>
                  ) : (
                    <button
                      onClick={() => addToBookmarks(mediaData)}
                      className='bookmark-btn'
                      aria-label='add to bookmarks'
                    >
                      <img src={NavBookmarkIcon} alt='' />
                    </button>
                  )}
                </div>
              </div>
              <p className='media-tagline'>{mediaData.tagline}</p>
              <h5 className='overview-title'>Overview</h5>
              <p className='media-description'>{mediaData.overview}</p>
            </div>
          </>
        )}
      </section>
      {/* Media cast */}
      <section className='media-cast-info'>
        <h3 className='cast-title'>The Cast</h3>
        <div className='cast-container'>
          {castData?.cast.map((person: ActorInfoDataType, index: number) => {
            if (index < 8)
              return (
                <div className='cast-member-card' key={person.id}>
                  <img src={`${apiCastProfileImgUrl}${person.profile_path}`} alt='' />
                  <div className='names-container'>
                    <h4 className='actor-name'>{person.name}</h4>
                    <p className='character-name'>
                      {mediaType === MediaEnum.MOVIE
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
          })}
        </div>
      </section>
    </>
  ) : (
    <h3>Loading</h3>
  )
}

export default MediaDetailsPage
