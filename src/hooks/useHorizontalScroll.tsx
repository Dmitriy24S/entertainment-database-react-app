import { RefObject, useEffect, useRef } from 'react'

const useHorizontalScroll = (
  leftButtonRef: RefObject<HTMLButtonElement>,
  rightButtonRef: RefObject<HTMLButtonElement>
) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current === null) return
    if (leftButtonRef.current === null) return
    if (rightButtonRef.current === null) return

    const element = elementRef.current
    const leftButton = leftButtonRef.current
    const rightButton = rightButtonRef.current

    const overflowRowContainer = element.querySelector('#row') as HTMLDivElement

    const handleLeftClick = () => {
      console.log('left')
      overflowRowContainer.scrollTo({
        left: overflowRowContainer.scrollLeft - 600,
        behavior: 'smooth',
      })
    }

    const handleRightClick = () => {
      console.log('right')
      overflowRowContainer.scrollTo({
        left: overflowRowContainer.scrollLeft + 600,
        behavior: 'smooth',
      })
    }

    leftButton.addEventListener('click', handleLeftClick)
    rightButton.addEventListener('click', handleRightClick)

    return () => {
      leftButton.removeEventListener('click', handleLeftClick)
      rightButton.removeEventListener('click', handleRightClick)
    }
  }, [leftButtonRef, rightButtonRef])

  return elementRef
}

export default useHorizontalScroll
