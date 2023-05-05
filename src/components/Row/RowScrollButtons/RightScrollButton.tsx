import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

import styles from './Button.module.scss'

interface Props {
  rightButtonRef: React.RefObject<HTMLButtonElement>
}

const RightSrollButton = ({ rightButtonRef }: Props) => (
  <button
    type='button'
    ref={rightButtonRef}
    aria-label='Move list to the right'
    // className={[styles.rowButton, 'right-button'].join(' ')}
    className={[styles.rowButton, styles.rightButton].join(' ')}
  >
    <AiOutlineArrowRight />
  </button>
)

export default RightSrollButton
