import { BsFillPlayFill } from 'react-icons/bs'
import styles from './PlayTrailerButton.module.scss'

interface Props {
  toggleShowVideo: () => void
}

const PlayTrailerButton = ({ toggleShowVideo }: Props) => {
  return (
    <button type='button' onClick={toggleShowVideo} className={styles.trailerButton}>
      <BsFillPlayFill />
      Play Trailer
    </button>
  )
}

export default PlayTrailerButton
