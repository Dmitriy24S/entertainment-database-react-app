import React from 'react'

import { CombinedMediaType, MediaType, MovieDetailsGenresType } from '../../../types'
import { getRuntime } from '../../../utils/getRuntime'

import styles from './QuickInfo.module.scss'

interface QuickInfoProps {
  releaseDate: string
  mediaData: CombinedMediaType
  mediaType: MediaType
}

const QuickInfo: React.FC<QuickInfoProps> = ({ releaseDate, mediaData, mediaType }) => {
  return (
    <ul className={styles.shortList}>
      <li>{releaseDate}</li>
      <li className={styles.genres}>
        <span>
          {mediaData.genres.map((genre: MovieDetailsGenresType, index: number) =>
            index !== mediaData.genres.length - 1 ? genre.name + ', ' : genre.name
          )}
        </span>
      </li>
      <li className={styles.runtime}>
        {mediaType === MediaType.MOVIE
          ? getRuntime(mediaData.runtime)
          : `${mediaData.last_episode_to_air.runtime}min`}
        {/* : `${mediaData.episode_run_time[0]}min`} */}
      </li>
    </ul>
  )
}

export default QuickInfo
