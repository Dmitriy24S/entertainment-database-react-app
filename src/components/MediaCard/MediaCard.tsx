import { Link } from 'react-router-dom'

import { useBookmarksContext } from '../../context/ContextProvider'
import { CombinedMediaType } from '../../types'
import Bookmark from '../Bookmark/Bookmark'

import styles from './MediaCard.module.scss'

interface MediaCardProps {
  mediaItem: CombinedMediaType
  urlName: string
  title: string
  mediaType: string
}

const MediaCard = ({ mediaItem, urlName, title, mediaType }: MediaCardProps) => {
  const { addToBookmarks, checkInBookmarksStatus } = useBookmarksContext()

  return (
    <article className={styles.mediaCard}>
      <Bookmark
        title={checkInBookmarksStatus(mediaItem) ? 'Remove bookmark' : 'Add bookmark'}
        isBookmarked={checkInBookmarksStatus(mediaItem)}
        handleClick={() => addToBookmarks(mediaItem)}
      />
      <img
        src={`https://www.themoviedb.org/t/p/w440_and_h660_face${mediaItem.poster_path}`}
        alt={`${title} poster`}
        loading='lazy'
        className={styles.poster}
      />
      <Link
        to={`/${mediaType}/${mediaItem.id}-${urlName}`}
        state={[mediaItem.id, mediaType]}
        className={styles.cardtitle}
      >
        {title}
      </Link>
    </article>
  )
}

export default MediaCard
