import MediaList from '../../components/MediaList/MediaList'
import { MediaType } from '../../types'

const MovieListPage = () => {
  return <MediaList pageMediaType={MediaType.MOVIE} />
}

export default MovieListPage
