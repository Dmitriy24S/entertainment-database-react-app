import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../../App'
import { AppContextType, MediaDataType, MediaType } from '../../types'
import Bookmark from '../Bookmark/Bookmark'

import MediaRatingCircularProgressBar from '../MediaRatingCircularProgressBar/MediaRatingCircularProgressBar'
import styles from './MediaCardLarge.module.scss'

interface MediaCardLargeProps {
  item: MediaDataType
  userScore: number
  media: MediaType // !
  urlName: string
  mediaTitle: string
}

const MediaCardLarge: React.FC<MediaCardLargeProps> = ({
  item,
  userScore,
  media,
  urlName,
  mediaTitle,
}) => {
  const { addToBookmarks, checkInBookmarksStatus } = useContext(
    AppContext
  ) as AppContextType

  return (
    <article className={styles.mediaCard}>
      <Bookmark
        title={checkInBookmarksStatus(item) ? 'Remove bookmark' : 'Add bookmark'}
        isBookmarked={checkInBookmarksStatus(item)}
        handleClick={() => addToBookmarks(item)}
      />
      <img
        src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item.poster_path}`}
        alt={mediaTitle}
        className={styles.mediaCardPoster}
      />
      <div className={styles.mediaInfo}>
        <div className={styles.userScoreContainer}>
          <MediaRatingCircularProgressBar userScore={userScore} />
        </div>
        <h4 className={styles.mediaTitle}>
          <Link to={`/${media}/${item.id}-${urlName}`} state={[item.id, media]}>
            {mediaTitle}
          </Link>
        </h4>
        <p className={styles.mediaReleaseDate}>
          {media === MediaType.MOVIE && item.release_date}
          {media === MediaType.TV && item.first_air_date}
        </p>
      </div>
    </article>
  )
}

export default MediaCardLarge
