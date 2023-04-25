import { CombinedMediaType } from '../../../types'
import styles from './Overview.module.scss'

const Overview = ({ mediaData }: { mediaData: CombinedMediaType }) => {
  return (
    <div className={styles.overview}>
      <h5 className={styles.overviewTitle}>Overview</h5>
      <p className={styles.overviewDescription}>{mediaData.overview}</p>
    </div>
  )
}

export default Overview
