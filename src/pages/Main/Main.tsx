import { useContext } from 'react'
import { AppContext } from '../../App'
import { AppContextType, MediaType } from '../../types'

import Row from '../../components/Row/Row'

const Main = () => {
  const { dataPopularMovies, dataTrendingTv } = useContext(AppContext) as AppContextType

  return (
    <>
      <Row data={dataPopularMovies} mediaType={MediaType.MOVIE} />
      <Row data={dataTrendingTv} mediaType={MediaType.TV} />
    </>
  )
}

export default Main
