import { Tooltip } from '@mui/material'
import React from 'react'
import { BsFillBookmarkFill } from 'react-icons/bs'
import styles from './Bookmark.module.scss'

interface BookmarkProps {
  title: string
  isBookmarked: boolean
  handleClick: () => void
  fullPage?: boolean
}

const Bookmark: React.FC<BookmarkProps> = ({
  title,
  isBookmarked,
  handleClick,
  fullPage = false,
}) => {
  return (
    <Tooltip title={title}>
      <button
        aria-label={title}
        onClick={handleClick}
        className={[
          styles.bookmarkButton,
          fullPage ? styles.fullPageBookmarkButton : '',
          isBookmarked ? styles.activeBookmarkButton : '',
        ].join(' ')}
      >
        <BsFillBookmarkFill size={fullPage ? 20 : 16} />
      </button>
    </Tooltip>
  )
}

export default Bookmark
