import { Link } from 'react-router-dom'

import { useBookmarksContext } from '../../context/ContextProvider'
import Bookmark from '../Bookmark/Bookmark'

import { CombinedMediaType, MediaType } from '../../types'

import styles from './MediaCard.module.scss'

interface MediaCardProps {
  mediaItem: CombinedMediaType
  mediaType: string
}

const MediaCard = ({ mediaItem, mediaType }: MediaCardProps) => {
  const { addToBookmarks, checkInBookmarksStatus } = useBookmarksContext()
  const mediaApiTitle = mediaType === MediaType.MOVIE ? 'title' : 'name'

  // Put "-"" instead space in movie title for url:
  const urlName = mediaItem[mediaApiTitle]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/gi, '')

  return (
    <article className={styles.mediaCard}>
      <Bookmark
        title={checkInBookmarksStatus(mediaItem) ? 'Remove bookmark' : 'Add bookmark'}
        isBookmarked={checkInBookmarksStatus(mediaItem)}
        handleClick={() => addToBookmarks(mediaItem)}
      />
      <img
        src={`https://www.themoviedb.org/t/p/w440_and_h660_face${mediaItem.poster_path}`}
        alt={`${mediaApiTitle} poster`}
        loading='lazy'
        className={styles.poster}
      />
      <Link
        to={`/${mediaType}/${mediaItem.id}-${urlName}`}
        state={[mediaItem.id, mediaType]}
        className={styles.cardtitle}
      >
        {mediaItem[mediaApiTitle]}
      </Link>
    </article>
  )
}

export default MediaCard
