import React, { useEffect, useRef, useState } from 'react'

import useHorizontalScroll from '../../hooks/useHorizontalScroll'
import LeftScrollButton from './RowScrollButtons/LeftScrollButton'
import RightSrollButton from './RowScrollButtons/RightScrollButton'

import { CombinedMediaType, MediaType } from '../../types'

import sharedStyles from '../../shared/sharedStyles.module.scss'
import styles from './Row.module.scss'

interface RowProps {
  data: CombinedMediaType[]
  mediaType: MediaType
  children: React.ReactNode
}

const Row: React.FC<RowProps> = ({ data, mediaType, children }) => {
  const leftButtonRef = useRef<HTMLButtonElement>(null)
  const rightButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useHorizontalScroll(leftButtonRef, rightButtonRef)
  const rowRef = useRef<HTMLDivElement>(null)

  const [showFade, setShowFade] = useState(true)

  useEffect(() => {
    const rowRefCurrent = rowRef.current
    if (rowRefCurrent === null) return

    console.log('listContainer.scrollLeft', rowRefCurrent.scrollLeft)

    const handleFade = () => {
      if (rowRefCurrent.scrollLeft === 0) {
        setShowFade(true)
      } else {
        setShowFade(false)
      }
    }

    rowRefCurrent.addEventListener('scroll', handleFade)

    return () => rowRefCurrent.removeEventListener('scroll', handleFade)
  }, [rowRef])

  return (
    // TODO: add skeleton?
    <section className={sharedStyles.container}>
      <h1 className={sharedStyles.header}>
        {mediaType === MediaType.MOVIE ? 'Popular movies' : 'Trending shows'}
      </h1>
      {/* Outer Container */}
      <div
        ref={containerRef}
        className={[styles.itemsOuterContainer, showFade ? styles.fade : ''].join(' ')}
      >
        <LeftScrollButton leftButtonRef={leftButtonRef} />
        <RightSrollButton rightButtonRef={rightButtonRef} />

        {/* Inner Container */}
        <div ref={rowRef} id='row' className={styles.itemsInnerContainer}>
          {children}
        </div>
      </div>
    </section>
  )
}

export default Row
