import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import BookmarksListPage from './pages/BookmarksListPage/BookmarksListPage'
import Main from './pages/Main/Main'
import MediaDetailsPage from './pages/MediaDetailsPage/MediaDetailsPage'
import MovieListPage from './pages/MovieListPage/MovieListPage'
import TvShowListPage from './pages/TvShowListPage/TvShowLIstPage'

import './App.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='App'>
        <BrowserRouter>
          <Header />
          <main className='App-main'>
            <Routes>
              <Route path='' element={<Main />} />
              <Route path='/movie/:id' element={<MediaDetailsPage />} />
              <Route path='/tv/:id' element={<MediaDetailsPage />} />
              <Route path='/movies' element={<MovieListPage />} />
              <Route path='/tv' element={<TvShowListPage />} />
              <Route path='/bookmarks' element={<BookmarksListPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default React.memo(App)
