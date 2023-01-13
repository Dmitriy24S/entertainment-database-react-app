import { Tooltip } from '@mui/material'
import { useContext } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { AppContext } from '../../App'
import styles from '../../components/MediaList/MediaList.module.scss'
import NavBookmarkIcon from '../../images/icon-nav-bookmark.svg'
import { AppContextType, MediaDataType } from '../../types'
import './Bookmarks.scss'

const Bookmarks = () => {
  const { bookmarkedItems, addToBookmarks } = useContext(AppContext) as AppContextType

  return (
    <section className='list bookmark-list'>
      <h1 className='list-name'>Bookmarks</h1>
      {/* <div className='movie-list-container'> */}
      <div className={styles.mediaListContainer}>
        {bookmarkedItems.map((item: MediaDataType, index: number) => {
          const userScore = item?.vote_average * 10
          return (
            // <article className='movie-card bookmark-movie-card' key={item.id}>
            <article className={styles.mediaCard} key={item.id}>
              <Tooltip title='Remove bookmark'>
                <button
                  onClick={() => addToBookmarks(item)}
                  className='bookmark-btn bookmark-btn--card unbookmark'
                  aria-label='remove from bookmarks'
                >
                  <img src={NavBookmarkIcon} alt='' />
                </button>
              </Tooltip>
              <img
                src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item?.poster_path}`}
                alt=''
                // className='movie-card-poster'
                className={styles.mediaCardPoster}
              />
              {/* <div className='movie-info'> */}
              <div className={styles.mediaInfo}>
                {/* <div className='user-score-container'> */}
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
                {/* <h4 className='movie-title'> */}
                <h4 className={styles.mediaTitle}>
                  {/* api name difference for movie / tv show data */}
                  {item.original_title ? item.original_title : item.original_name}
                </h4>
                {/* <p className='movie-release-date'> */}
                <p className={styles.mediaReleaseDate}>
                  {item.release_date ? item.release_date : item.first_air_date}
                  {/* api name difference for movie / tv show data */}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Bookmarks
