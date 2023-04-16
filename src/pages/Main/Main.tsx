import { useContext } from 'react'
import { AppContext } from '../../App'
import { AppContextType } from '../../types'

import Row from '../../components/Row/Row'

const Main = () => {
  const { dataPopularMovies, dataTrendingTv } = useContext(AppContext) as AppContextType

  return (
    <>
      <Row data={dataPopularMovies} mediaType='movies' />
      <Row data={dataTrendingTv} mediaType='tv' />
    </>
  )
}

export default Main
