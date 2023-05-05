import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import styles from './Button.module.scss'

interface Props {
  leftButtonRef: React.RefObject<HTMLButtonElement>
}

const LeftScrollButton = ({ leftButtonRef }: Props) => (
  <button
    type='button'
    ref={leftButtonRef}
    aria-label='Move list to the left'
    className={[styles.rowButton, 'left-button'].join(' ')}
  >
    <AiOutlineArrowLeft />
  </button>
)

export default LeftScrollButton
