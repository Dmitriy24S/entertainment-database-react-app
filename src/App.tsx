import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import Header from './components/Header/Header'

const Main = React.lazy(() => import(/* webpackChunkName: "Main" */ './pages/Main/Main'))
const MovieListPage = React.lazy(
  () =>
    import(/* webpackChunkName: "MovieListPage" */ './pages/MovieListPage/MovieListPage')
)
const TvShowListPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "TvShowListPage" */ './pages/TvShowListPage/TvShowLIstPage'
    )
)
const BookmarksListPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "BookmarksListPage" */ './pages/BookmarksListPage/BookmarksListPage'
    )
)
const MediaDetailsPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "MediaDetailsPage" */ './pages/MediaDetailsPage/MediaDetailsPage'
    )
)

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
              <Route
                path=''
                element={
                  <Suspense>
                    <Main />
                  </Suspense>
                }
              />
              <Route
                path='/movie/:id'
                element={
                  <Suspense>
                    <MediaDetailsPage />
                  </Suspense>
                }
              />
              <Route
                path='/tv/:id'
                element={
                  <Suspense>
                    <MediaDetailsPage />
                  </Suspense>
                }
              />
              <Route
                path='/movies'
                element={
                  <Suspense>
                    <MovieListPage />
                  </Suspense>
                }
              />
              <Route
                path='/tv'
                element={
                  <Suspense>
                    <TvShowListPage />
                  </Suspense>
                }
              />
              <Route
                path='/bookmarks'
                element={
                  <Suspense>
                    <BookmarksListPage />
                  </Suspense>
                }
              />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default React.memo(App)
