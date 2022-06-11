export interface MovieListDataType {
  page: number; // 1
  results: MediaDataType[];
  dates: {
    maximum: string; // "2016-09-01"
    minimum: string; // "2016-07-21"
  };
  total_pages: number; // 33
  total_results: number; // 649
}

export interface MediaDataType {
  adult: boolean; // false
  backdrop_path: string; // "/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg"
  genre_ids: number[]; // [ 14, 28, 80]
  id: number; // 297761
  original_language: string; // "en"
  original_title?: string; // "Suicide Squad"
  original_name?: string;
  overview: string; // "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences."
  poster_path: string; // "/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg"
  release_date: string; // "2016-08-03"
  title: string; // "Suicide Squad"
  video: boolean; // false,
  vote_average: number; // 5.91
  vote_count: number; // 1466
  popularity: number; // 48.261451
}

export interface CastDataType {
  id: number; // 550
  cast: ActorInfoDataType[];
}

export interface ActorInfoDataType {
  adult: boolean; // false,
  gender: number; // 2
  id: number; // 819
  known_for_department: string; // "Acting"
  name: string; // "Edward Norton"
  original_name: string; // "Edward Norton"
  popularity: number; // 7.861
  profile_path: string; // "/5XBzD5WuTyVQZeS4VI25z2moMeY.jpg"
  cast_id: number; // 4
  character: string; // "The Narrator"
  credit_id: string; // "52fe4250c3a36847f80149f3"
  order: number; // 0
}

export interface MovieDetailsDataType {
  adult: boolean; // false
  backdrop_path: string; // "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg"
  belongs_to_collection: any | null; // ?
  budget: number; // 63000000
  genres: MovieDetailsGenresType[];
  homepage: string; // ""
  id: number; // 550
  imdb_id: string; // "tt0137523"
  original_language: string; // "en"
  original_title: string; // "Fight Club"
  overview: string; // 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.'
  popularity: number; // 0.5
  poster_path: string | null;
  production_companies: ProductionCompanyType[];
  production_countries: [
    {
      iso_3166_1: string; // "US"
      name: string; // "United States of America"
    }
  ];
  release_date: string; // "1999-10-12"
  revenue: number; // 100853753
  runtime: number; // 139
  spoken_languages: [
    {
      iso_639_1: string; // "en"
      name: string; // "English"
    }
  ];
  status: string; // "Released"
  tagline: string; // "How much can you know about yourself if you've never been in a fight?"
  title: string; // "Fight Club"
  video: boolean; // false
  vote_average: number; // 7.8
  vote_count: number; // 3439
}

export interface MovieDetailsGenresType {
  id: number; // 18;
  name: string; // "Drama"
}

interface ProductionCompanyType {
  id: number; // 508;
  logo_path: string | null; // "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png"
  name: string; // "Regency Enterprises"
  origin_country: string; // "US"
}

export interface AppContextType {
  dataPopularMovies: MediaDataType[];
  dataTrendingTv: MediaDataType[];
  bookmarkedItems: MediaDataType[];
  setBookmarkedItems: React.Dispatch<React.SetStateAction<MediaDataType[]>>;
  addToBookmarks: (obj: MediaDataType | MovieDetailsDataType) => void; // ? future refactor
  checkInBookmarksStatus: (
    obj: MediaDataType | MovieDetailsDataType // ? future refactor
  ) => boolean;
}
