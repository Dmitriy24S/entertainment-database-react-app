import React from 'react'
import { CombinedMediaType, MediaType } from '../../../types'
import styles from './Title.module.scss'

interface TitleProps {
  mediaType: MediaType
  mediaData: CombinedMediaType
  mediaYear: string
}

const Title: React.FC<TitleProps> = ({ mediaType, mediaData, mediaYear }) => {
  return (
    <h1 className={styles.title}>
      {/* {mediaType === MediaType.MOVIE ? mediaData.original_title : mediaData.original_name} */}
      {mediaType === MediaType.MOVIE ? mediaData.title : mediaData.name}
      <span className={styles.year}>{` (${mediaYear && mediaYear[0]})`}</span>
    </h1>
  )
}

export default Title
