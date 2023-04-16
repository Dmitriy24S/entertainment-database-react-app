import Tooltip from '@mui/material/Tooltip'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import NavBookmarkIcon from '../../images/icon-nav-bookmark.svg'
import { AppContextType, MediaDataType } from '../../types'

interface MediaCardProps {
  mediaItem: MediaDataType
  urlName: string
  title: string
  mediaType: string
}

const MediaCard = ({ mediaItem, urlName, title, mediaType }: MediaCardProps) => {
  const { addToBookmarks, checkInBookmarksStatus } = useContext(
    AppContext
  ) as AppContextType
  return (
    <article className='media-card'>
      {/* Bookmark button */}
      {checkInBookmarksStatus(mediaItem) ? (
        <Tooltip title='Remove bookmark'>
          <button
            onClick={() => addToBookmarks(mediaItem)}
            className='bookmark-btn bookmark-btn--card unbookmark'
            aria-label='remove from bookmarks'
          >
            <img src={NavBookmarkIcon} alt='' className='bookmark-icon' />
          </button>
        </Tooltip>
      ) : (
        <Tooltip title='Add bookmark'>
          <button
            onClick={() => addToBookmarks(mediaItem)}
            // TODO: refactor bookmark / bookmark-btn--card ?
            className='bookmark-btn bookmark-btn--card'
            aria-label='add to bookmarks'
          >
            <img src={NavBookmarkIcon} alt='' className='bookmark-icon' />
          </button>
        </Tooltip>
      )}
      <img
        src={`https://www.themoviedb.org/t/p/w440_and_h660_face${mediaItem.poster_path}`}
        alt={`${title} poster`}
        className='media-poster'
      />
      <Link
        to={`/${mediaType}/${mediaItem.id}-${urlName}`}
        state={[mediaItem.id, mediaType]}
        className='media-card-title'
      >
        {title}
      </Link>
    </article>
  )
}

export default MediaCard
