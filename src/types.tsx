export enum MediaEnum {
  TV = 'tv',
  MOVIE = 'movie',
}

export interface MovieListDataType {
  page: number // 1
  results: MediaDataType[]
  dates: {
    maximum: string // "2016-09-01"
    minimum: string // "2016-07-21"
  }
  total_pages: number // 33
  total_results: number // 649
}

export interface MediaDataType {
  adult: boolean // false
  backdrop_path: string // "/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg"
  genre_ids: number[] // [ 14, 28, 80]
  id: number // 297761
  original_language: string // "en"
  //   original_title?: string; // "Suicide Squad"
  original_title: string // "Suicide Squad"
  //   original_name?: string;
  original_name: string
  overview: string // "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences."
  poster_path: string // "/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg"
  release_date: string // "2016-08-03"
  first_air_date: string
  title: string // "Suicide Squad"
  video: boolean // false,
  vote_average: number // 5.91
  vote_count: number // 1466
  popularity: number // 48.261451
  // TODO: refactor values missing?
  media_type?: string
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

export interface MovieDetailsDataType {
  adult: boolean // false
  backdrop_path: string // "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg"
  belongs_to_collection: any | null // ?
  budget: number // 63000000
  genres: MovieDetailsGenresType[]
  homepage: string // ""
  id: number // 550
  imdb_id: string // "tt0137523"
  original_language: string // "en"
  original_title: string // "Fight Club"
  overview: string // 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.'
  popularity: number // 0.5
  poster_path: string | null
  production_companies: ProductionCompanyType[]
  production_countries: [
    {
      iso_3166_1: string // "US"
      name: string // "United States of America"
    }
  ]
  release_date: string // "1999-10-12"
  revenue: number // 100853753
  runtime: number // 139
  spoken_languages?: tvSpokenLangType[]
  status: string // "Released"
  tagline: string // "How much can you know about yourself if you've never been in a fight?"
  title: string // "Fight Club"
  video: boolean // false
  vote_average: number // 7.8
  vote_count: number // 3439
}

export interface MovieDetailsGenresType {
  id: number // 18;
  name: string // "Drama"
}

interface ProductionCompanyType {
  id: number // 508;
  logo_path: string | null // "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png"
  name: string // "Regency Enterprises"
  origin_country: string // "US"
}

export interface AppContextType {
  dataPopularMovies: MediaDataType[]
  dataTrendingTv: MediaDataType[]
  bookmarkedItems: MediaDataType[]
  setBookmarkedItems: React.Dispatch<React.SetStateAction<MediaDataType[]>>
  addToBookmarks: (obj: MediaDataType | MovieDetailsDataType) => void // ? future refactor
  checkInBookmarksStatus: (
    obj: MediaDataType | MovieDetailsDataType // ? future refactor
  ) => boolean
  activeMenu: string
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>
}

// export interface TvShowDetailsType extends MovieDetailsDataType {
export interface TvShowDetailsType {
  backdrop_path: string // "/suopoADq0k8YZr4dQXcU6pToj6s.jpg"
  created_by: tvCreatedByType[]
  episode_run_time: number[]
  first_air_date: string // "2011-04-17"
  genres: tvGenresType[]
  homepage: string //  "http://www.hbo.com/game-of-thrones";
  id: number // 1399;
  in_production: boolean // false;
  languages: string[]
  last_air_date: string // "2019-05-19";
  last_episode_to_air: tvLastEpisodeType
  name: string // "Game of Thrones";
  next_episode_to_air: null
  networks: tvNetworksType[]
  number_of_episodes: number //73;
  number_of_seasons: number // 8;
  origin_country: string // ["US"];
  original_language: string // "en";
  original_name: string // "Game of Thrones";
  overview: string // "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.";
  popularity: number // 369.594;
  poster_path: string | null // "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg";
  production_companies: ProductionCompanyType[]
  seasons: tvSeasonsType[]
  spoken_languages?: tvSpokenLangType[]
  status: string // "Ended";
  tagline: string // "Winter Is Coming";
  type: string // "Scripted";
  vote_average: number // 8.3;
  vote_count: number // 11504;
}

export interface MediaDetailType extends TvShowDetailsType, MovieDetailsDataType {}

interface tvCreatedByType {
  id: number // 9813,
  credit_id: string // "5256c8c219c2956ff604858a",
  name: string // "David Benioff",
  gender: number // 2,
  profile_path: string // "/xvNN5huL0X8yJ7h3IZfGG4O2zBD.jpg"
}
interface tvGenresType {
  id: number // 10765
  name: string // "Sci-Fi & Fantasy"
}

interface tvNetworksType {
  name: string // "HBO";
  id: number // 49;
  logo_path: string // "/tuomPhY2UtuPTqqFnKMVHvSb724.png";
  origin_country: string // "US";
}

interface tvSeasonsType {
  air_date: string // "2010-12-05";
  episode_count: number // 64;
  id: number //3627;
  name: string // "Specials";
  overview: string // "";
  poster_path: string // "/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg";
  season_number: number //0;
}

interface tvSpokenLangType {
  english_name?: string // "English";
  iso_639_1?: string // "en";
  name?: string //"English";
}

interface tvLastEpisodeType {
  air_date: string // "2019-05-19";
  episode_number: number // 6;
  id: number //1551830;
  name: string // "The Iron Throne";
  overview: string // "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.";
  production_code: string // "806";
  season_number: number // 8;
  still_path: string //  "/3x8tJon5jXFa1ziAM93hPKNyW7i.jpg";
  vote_average: number // 4.8;
  vote_count: number // 106;
}
