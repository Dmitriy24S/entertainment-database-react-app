import React from 'react'
import MediaRatingCircularProgressBar from '../../MediaRatingCircularProgressBar/MediaRatingCircularProgressBar'
import styles from './Score.module.scss'

const Score = ({ userScore }: { userScore: number }) => {
  return (
    <div className={styles.userRating}>
      {/* Media user score rating circle */}
      <div className={styles.ratingCircleContainer}>
        <MediaRatingCircularProgressBar userScore={userScore} />
      </div>
      <h5 className={styles.userRatingTitle}>
        User <br /> Score
      </h5>
    </div>
  )
}

export default Score
