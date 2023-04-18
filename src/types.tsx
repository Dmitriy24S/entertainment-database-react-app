export interface TBookmarksContext {
  bookmarkedItems: CombinedMediaType[]
  setBookmarkedItems: React.Dispatch<React.SetStateAction<CombinedMediaType[]>>
  addToBookmarks: (obj: CombinedMediaType) => void
  checkInBookmarksStatus: (obj: CombinedMediaType) => boolean
}

export interface TDataContext {
  dataPopularMovies: CombinedMediaType[]
  setDataPopularMovies: React.Dispatch<React.SetStateAction<CombinedMediaType[]>>
  dataTrendingTv: CombinedMediaType[]
  setDataTrendingTv: React.Dispatch<React.SetStateAction<CombinedMediaType[]>>
}

// export type MediaType = {
//   TV: 'tv'
//   MOVIE: 'movie'
//   BOOKMARKS: 'bookmarks'
// }

// export interface MediaType {
//   TV: 'tv'
//   MOVIE: 'movie'
//   BOOKMARKS: 'bookmarks'
// }

export enum MediaType {
  TV = 'tv',
  MOVIE = 'movie',
  BOOKMARKS = 'bookmarks',
}

type TV = {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
  release_date: string
  last_episode_to_air: {
    runtime: string
  }
}

type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  tagline: string
  runtime: number
  genres: {
    id: number
    name: string
  }[]
}

export interface CombinedMediaType extends TV, Movie {}

export interface MediaListDataType {
  page: number // 1
  results: CombinedMediaType[]
  dates: {
    maximum: string // "2016-09-01"
    minimum: string // "2016-07-21"
  }
  total_pages: number // 33
  total_results: number // 649
}

export interface CastDataType {
  id: number // 550
  cast: ActorInfoDataType[]
}

export interface ActorInfoDataType extends tvActorInfoDataType {
  adult: boolean // false,
  gender: number // 2
  id: number // 819
  known_for_department: string // "Acting"
  name: string // "Edward Norton"
  original_name: string // "Edward Norton"
  popularity: number // 7.861
  profile_path: string // "/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg"
  cast_id: number // 4
  character: string // "The Narrator"
  credit_id: string // "52fe4250c3a36847f80149f3"
  order: number // 0
}

export interface tvActorInfoDataType {
  adult: boolean // false,
  gender: number // 2,
  id: number // 60279,
  known_for_department: string // "Acting",
  name: string // "Fred Tatasciore",
  original_name: string //"Fred Tatasciore",
  popularity: number // 7.632,
  profile_path: string //"/busoEz4khUJ0hOoKHexjXwGrsit.jpg",
  roles: tvRolesType[]
  total_episode_count: number // 5,
  order: number // 112,
}

interface tvRolesType {
  credit_id: string // "62880db37d5db500669673d1",
  character: string // "Bound God / Raptor Base (voice)",
  episode_count: number // 1,
}

export interface MovieDetailsGenresType {
  id: number // 18;
  name: string // "Drama"
}
