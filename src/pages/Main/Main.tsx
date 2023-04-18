import Row from '../../components/Row/Row'
import { useDataContext } from '../../context/ContextProvider'

import { MediaType } from '../../types'

const Main = () => {
  console.count('Main')

  const { dataPopularMovies, dataTrendingTv } = useDataContext()

  return (
    <>
      <Row data={dataPopularMovies} mediaType={MediaType.MOVIE} />
      <Row data={dataTrendingTv} mediaType={MediaType.TV} />
    </>
  )
}

export default Main
