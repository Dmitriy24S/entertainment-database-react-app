import React, { useRef } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import useHorizontalScroll from '../../hooks/useHorizontalScroll'
import MediaCard from '../MediaCard/MediaCard'

import { CombinedMediaType, MediaType } from '../../types'

import sharedStyles from '../../shared/sharedStyles.module.scss'
import styles from './Row.module.scss'

interface RowProps {
  data: CombinedMediaType[]
  mediaType: MediaType
}

const Row: React.FC<RowProps> = ({ data, mediaType }) => {
  const leftButtonRef = useRef<HTMLButtonElement>(null)
  const rightButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useHorizontalScroll(leftButtonRef, rightButtonRef)

  const mediaApiTitle = mediaType === MediaType.MOVIE ? 'title' : 'name'

  const LeftSrollButton = () => (
    <button
      type='button'
      ref={leftButtonRef}
      aria-label='Move list to the left'
      className={[styles.rowButton, 'left-button'].join(' ')}
    >
      <AiOutlineArrowLeft />
    </button>
  )

  const RightSrollButton = () => (
    <button
      type='button'
      ref={rightButtonRef}
      aria-label='Move list to the right'
      // className={[styles.rowButton, 'right-button'].join(' ')}
      className={[styles.rowButton, styles.rightButton].join(' ')}
    >
      <AiOutlineArrowRight />
    </button>
  )

  return (
    <section className={sharedStyles.container}>
      <h1 className={sharedStyles.header}>
        {mediaType === MediaType.MOVIE ? 'Popular movies' : 'Trending shows'}
      </h1>
      {/* Outer Container */}
      <div className={styles.itemsOuterContainer} ref={containerRef}>
        <LeftSrollButton />
        <RightSrollButton />
        {/* Inner Container */}
        <div className={styles.itemsInnerContainer}>
          {data.map((mediaItem: CombinedMediaType) => {
            // Put "-"" instead space in movie title for url:
            const urlName = mediaItem[mediaApiTitle]
              .trim()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-]/gi, '')

            return (
              <MediaCard
                mediaItem={mediaItem}
                urlName={urlName}
                // title={mediaItem.title}
                title={mediaItem[mediaApiTitle]}
                mediaType={mediaType}
                key={mediaItem.id}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Row
