import { useEffect } from 'react'
import { CombinedMediaType } from '../types'

const useLocalStorage = (localStorageKey: string, storedState: CombinedMediaType[]) => {
  const value = localStorage.getItem('bookmarks')
  const storedBookmarks = value ? JSON.parse(value) : storedState

  useEffect(() => {
    const serializedValue = JSON.stringify(storedBookmarks)
    localStorage.setItem('bookmarks', serializedValue)
  }, [storedBookmarks, localStorageKey, storedState])

  return storedBookmarks
}

export default useLocalStorage
