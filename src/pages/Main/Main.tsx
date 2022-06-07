import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

const Main = () => {
  const { dataPopularMovies, dataTrendingTv } = useContext<any>(AppContext);

  return (
    <>
      {/* Movie section */}
      <section className="list">
        <h1 className="list-name">Popular movies</h1>
        <div className="list-items">
          {dataPopularMovies.map((movie: any, index: number) => {
            // Put "-"" instead space in movie title for url:
            const urlName = movie.title
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/gi, "");

            return (
              <article key={movie.id} className="movie-card">
                <Link
                  to={`/entertainment-database-react-app/movie/${movie.id}-${urlName}`}
                  state={movie.id}
                >
                  <img
                    src={`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
                    alt={`${movie.original_name} poster`}
                    className="movie-poster"
                  />
                  <h4 className="movie-card-title">{movie.title}</h4>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Trending TV section */}
      <section className="list">
        <h1 className="list-name">Trending shows</h1>
        <div className="list-items">
          {dataTrendingTv?.map((movie: any, index: number) => {
            return (
              <article key={movie.id} className="movie-card">
                <img
                  src={`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`}
                  alt={`${movie.original_name} poster`}
                  className="movie-poster"
                />
                <Link
                  to={`/entertainment-database-react-app/movie/${movie.id}`}
                >
                  <h4 className="movie-card-title">{movie.original_name}</h4>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Main;
