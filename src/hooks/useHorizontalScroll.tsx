import { RefObject, useEffect, useRef } from 'react'

// const useHorizontalScroll = (leftButtonClass: string, rightButtonClass: string) => {
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

    // const leftButton = element.querySelector(`.${leftButtonClass}`) as HTMLButtonElement
    // const rightButton = element.querySelector(`.${rightButtonClass}`) as HTMLButtonElement

    const overflowListContainer = element.querySelector('.list-items') as HTMLDivElement

    const handleLeftClick = () => {
      console.log('left')
      overflowListContainer.scrollTo({
        left: overflowListContainer.scrollLeft - 600,
        behavior: 'smooth',
      })
    }

    const handleRightClick = () => {
      console.log('right')
      overflowListContainer.scrollTo({
        left: overflowListContainer.scrollLeft + 600,
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
