import MediaCard from '../../components/MediaCard/MediaCard'
import Row from '../../components/Row/Row'
import { useDataContext } from '../../context/ContextProvider'

import { CombinedMediaType, MediaType } from '../../types'

const Main = () => {
  console.count('Main')

  const { dataPopularMovies, dataTrendingTv } = useDataContext()

  return (
    <>
      {/* Movies */}
      <Row data={dataPopularMovies} mediaType={MediaType.MOVIE}>
        {dataPopularMovies?.map((mediaItem: CombinedMediaType) => {
          return (
            <MediaCard
              mediaItem={mediaItem}
              mediaType={MediaType.MOVIE}
              key={mediaItem.id}
            />
          )
        })}
      </Row>
      {/* TV */}
      <Row data={dataTrendingTv} mediaType={MediaType.TV}>
        {dataTrendingTv?.map((mediaItem: CombinedMediaType) => {
          return (
            <MediaCard
              mediaItem={mediaItem}
              mediaType={MediaType.TV}
              key={mediaItem.id}
            />
          )
        })}
      </Row>
    </>
  )
}

export default Main
