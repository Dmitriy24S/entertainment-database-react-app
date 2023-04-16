import { CircularProgress } from '@mui/material'
import styles from './Spinner.module.scss'

const Spinner = () => {
  return (
    <section className={styles.spinner}>
      <CircularProgress size={100} />
    </section>
  )
}

export default Spinner
