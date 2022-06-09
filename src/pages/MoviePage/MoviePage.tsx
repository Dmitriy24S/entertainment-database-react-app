import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../App";
import NavBookmarkIcon from "../../images/icon-nav-bookmark.svg";
import "./MoviePage.scss";

const MoviePage = () => {
  const { addToBookmarks, checkInBookmarksStatus } =
    useContext<any>(AppContext);
  const [movieData, setMovieData] = useState<any>();
  const [castData, setCastData] = useState<any>();

  // const { id } = useParams();
  // 338953-fantastic-beasts-the-secrets-of-dumbledore
  const { state } = useLocation(); // 338953 - movie id
  const userScore = movieData?.vote_average * 10;
  const apiUrl = "https://api.themoviedb.org/3";
  const apiKey = "b0574de2203f781e1f1bc82abcf3cd8d";
  const apiCastProfileImgUrl =
    "https://www.themoviedb.org/t/p/w276_and_h350_face";

  // Fetch movie/cast data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiMovieData = await axios.get(
          `https://api.themoviedb.org/3/movie/${state}?api_key=b0574de2203f781e1f1bc82abcf3cd8d&language=en-US
                `
        );
        setMovieData(apiMovieData.data);
        const apiCreditsData = await axios.get(
          `${apiUrl}/movie/${state}/credits?api_key=${apiKey}`
        );
        setCastData(apiCreditsData.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const calcRuntime = (minutesRuntime: number) => {
    let hours = minutesRuntime / 60;
    let leftover = hours - Math.floor(hours);
    let minutes = Math.round(leftover * 60);
    return `${Math.floor(hours)}h ${minutes}m`;
    // 1h 45m
  };

  let movieYear = movieData?.release_date.split("-");
  // ['2022', '03', '30']
  let releaseDate2;
  if (movieYear) {
    releaseDate2 = `${movieYear[1]}/${movieYear[2]}/${movieYear[0]}`;
  } // 2022/03/30

  return movieData ? (
    <>
      <Link to="/entertainment-database-react-app" className="return-btn">
        <IoMdArrowBack />
      </Link>
      <section className="movie-container">
        {movieData && (
          <>
            {/* Movie poster */}
            <img
              src={`https://www.themoviedb.org/t/p/w440_and_h660_face${movieData?.poster_path}`}
              alt={`${movieData?.original_title} poster`}
              className="movie-poster-full"
            />
            {/* Movie info */}
            <div className="movie-info">
              <h1 className="movie-title">
                {movieData?.original_title}
                <span className="movie-year"> ({movieYear[0]})</span>
              </h1>
              <ul className="short-list">
                <li>{releaseDate2}</li>
                <li>
                  <span className="genres">
                    {movieData.genres.map((genre: any, index: number) =>
                      index !== movieData.genres.length - 1
                        ? genre.name + ", "
                        : genre.name
                    )}
                  </span>
                </li>
                <li className="runtime">{calcRuntime(movieData.runtime)}</li>
              </ul>
              <div className="movie-interaction-menu">
                <div className="movie-user-rating">
                  {/* Movie user score rating circle */}
                  <div className="user-score-container">
                    <CircularProgressbar
                      value={userScore}
                      text={`${userScore}%`}
                      background
                      styles={buildStyles({
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        textSize: "1.3rem",
                        pathTransitionDuration: 0.5,
                        pathColor: `${
                          userScore > 65
                            ? "#2fd71d"
                            : userScore > 45
                            ? "#e6ff2a"
                            : "#de2b2b"
                        }`,
                        textColor: "white",
                        trailColor: "#3f3e3e",
                        backgroundColor: "#0a071d",
                      })}
                    />
                  </div>
                  <h5 className="user-rating-title">
                    User <br /> Score
                  </h5>
                  {/* Bookmark button */}
                  {checkInBookmarksStatus(movieData) ? (
                    <button
                      onClick={() => addToBookmarks(movieData)}
                      className="bookmark-btn unbookmark"
                      aria-label="remove from bookmarks this movie"
                    >
                      <img src={NavBookmarkIcon} alt="" />
                    </button>
                  ) : (
                    <button
                      onClick={() => addToBookmarks(movieData)}
                      className="bookmark-btn"
                      aria-label="add bookmark this movie"
                    >
                      <img src={NavBookmarkIcon} alt="" />
                    </button>
                  )}
                </div>
              </div>
              <p className="movie-tagline">{movieData.tagline}</p>
              <h5 className="overview-title">Overview</h5>
              <p className="movie-description">{movieData.overview}</p>
            </div>
          </>
        )}
      </section>
      {/* Movie cast */}
      <section className="movie-cast-info">
        <h3 className="cast-title">Movie Cast</h3>
        <div className="cast-container">
          {castData?.cast.map((person: any, index: number) => {
            if (index < 8)
              return (
                <div className="cast-member-card" key={person.id}>
                  <img
                    src={`${apiCastProfileImgUrl}${person.profile_path}`}
                    alt=""
                  />
                  <div className="names-container">
                    <h4 className="actor-name">{person.name}</h4>
                    <p className="character-name">{person.character}</p>
                  </div>
                </div>
              );
          })}
        </div>
      </section>
    </>
  ) : (
    <h3>Loading</h3>
  );
};

export default MoviePage;
