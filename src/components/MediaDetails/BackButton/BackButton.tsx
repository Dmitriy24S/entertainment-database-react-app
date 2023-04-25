import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import styles from './BackButton.module.scss'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => {
        navigate(-1)
      }}
      title='Go back'
      className={styles.returnButton}
    >
      <IoMdArrowBack />
    </button>
  )
}

export default BackButton
