import { AiOutlineClose } from 'react-icons/ai'
import styles from './TrailerVideo.module.scss'

interface Props {
  mediaTrailerUrl: string
  toggleShowVideo: () => void
}

const TrailerVideo = ({ mediaTrailerUrl, toggleShowVideo }: Props) => {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.backdrop} onClick={toggleShowVideo}></div>
      <button
        type='button'
        aria-label='close trailer window'
        onClick={toggleShowVideo}
        className={styles.closeVideoButton}
      >
        <AiOutlineClose />
      </button>
      <div className={styles.video}>
        <iframe
          // width='560'
          // width='80%'
          // height='315'
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${mediaTrailerUrl}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default TrailerVideo
