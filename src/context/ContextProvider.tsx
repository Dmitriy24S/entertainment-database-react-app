import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import useFetchData from '../hooks/useFetchData'
import useLocalStorage from '../hooks/useLocalStorage'

import { movieListUrl } from '../const/movieListUrl'
import { tvListUrl } from '../const/tvListUrl'
import { CombinedMediaType, TBookmarksContext, TDataContext } from '../types'

const BookmarksContext = createContext({} as TBookmarksContext)
const DataContext = createContext({} as TDataContext)

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  console.count('ContextProvider')

  const storedBookmarksValue = useLocalStorage('bookmarks', [])
  const [bookmarkedItems, setBookmarkedItems] =
    useState<CombinedMediaType[]>(storedBookmarksValue)

  const {
    data: { results: fetchedMovieData },
  } = useFetchData(movieListUrl, [])
  const [dataPopularMovies, setDataPopularMovies] = useState<CombinedMediaType[]>([])

  const {
    data: { results: fetchedTvData },
  } = useFetchData(tvListUrl, [])
  const [dataTrendingTv, setDataTrendingTv] = useState<CombinedMediaType[]>([])

  useEffect(() => {
    setDataPopularMovies(fetchedMovieData)
  }, [fetchedMovieData])

  useEffect(() => {
    setDataTrendingTv(fetchedTvData)
  }, [fetchedTvData])

  // Add item to bookmarks
  const addToBookmarks = useCallback(
    (obj: CombinedMediaType) => {
      // Check for matching item in bookmarks
      const findItem = bookmarkedItems.find(
        (bookmark) => Number(obj.id) === Number(bookmark.id)
      )
      if (findItem) {
        // If item already in bookmarks remove it
        setBookmarkedItems(bookmarkedItems.filter((item) => item.id !== obj.id))
      } else {
        // Add item
        setBookmarkedItems([...bookmarkedItems, obj])
      }
    },
    [bookmarkedItems]
  )

  // Check if item already in bookmarks true/false
  const checkInBookmarksStatus = useCallback(
    (obj: CombinedMediaType) => {
      return bookmarkedItems.some(
        (item: CombinedMediaType) => Number(item.id) === Number(obj.id)
      )
    },
    [bookmarkedItems]
  )

  const memoizedBookmarksValues = useMemo(
    () => ({
      bookmarkedItems,
      setBookmarkedItems,
      addToBookmarks,
      checkInBookmarksStatus,
    }),
    [bookmarkedItems, setBookmarkedItems, addToBookmarks, checkInBookmarksStatus]
  )

  const memoizedDataValues = useMemo(
    () => ({
      dataPopularMovies,
      setDataPopularMovies,
      dataTrendingTv,
      setDataTrendingTv,
    }),
    [dataPopularMovies, setDataPopularMovies, dataTrendingTv, setDataTrendingTv]
  )

  return (
    <BookmarksContext.Provider value={memoizedBookmarksValues}>
      <DataContext.Provider value={memoizedDataValues}>{children}</DataContext.Provider>
    </BookmarksContext.Provider>
  )
}

export const useBookmarksContext = () => useContext(BookmarksContext)
export const useDataContext = () => useContext(DataContext)
