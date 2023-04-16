import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

interface Props {
  userScore: number
}

const MediaRatingCircularProgressBar: React.FC<Props> = ({ userScore }) => {
  return (
    <CircularProgressbar
      text={`${userScore}%`}
      value={userScore}
      background
      styles={buildStyles({
        // strokeLinecap: 'butt', // square rating circle corners
        strokeLinecap: 'round',
        textSize: '1.3rem',
        pathTransitionDuration: 0.5,
        pathColor: `${
          userScore > 65 ? '#2fd71d' : userScore > 45 ? '#e6ff2a' : '#de2b2b'
        }`,
        textColor: 'white',
        trailColor: '#3f3e3e',
        backgroundColor: '#100c29',
      })}
    />
  )
}

export default MediaRatingCircularProgressBar
