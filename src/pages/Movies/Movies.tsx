import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Movies.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const Movies = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any>();
  const [selectedPage, setSelectedPage] = useState(1);
  const apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
  const apiKey = "b0574de2203f781e1f1bc82abcf3cd8d";

  useEffect(() => {
    const fetchNowPlayingMoviesData = async () => {
      try {
        const apiNowPlayingMovies = await axios.get(
          `${apiUrl}${apiKey}&language=en-US&page=${selectedPage}`
        );
        setNowPlayingMovies(apiNowPlayingMovies.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchNowPlayingMoviesData();
  }, [selectedPage]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selectedPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value);
  };

  return (
    <section className="list">
      <h1 className="list-name">Now playing movies</h1>
      <div className="movie-list-container">
        {nowPlayingMovies ? (
          <>
            {nowPlayingMovies.results.map((item: any, index: number) => {
              const userScore = item?.vote_average * 10;
              return (
                <article className="movie-card" key={item.id}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w440_and_h660_face${item?.poster_path}`}
                    alt=""
                    className="movie-card-poster"
                  />
                  <div className="movie-info">
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
                          backgroundColor: "#100c29",
                        })}
                      />
                    </div>
                    <h4 className="movie-title">{item.original_title}</h4>
                    <p className="movie-release-date">{item.release_date}</p>
                  </div>
                </article>
              );
            })}
            {/* Pagination */}
            <Stack spacing={2} className="pagination">
              <Pagination
                count={nowPlayingMovies.total_pages}
                page={nowPlayingMovies.page}
                onChange={handleChange}
              />
            </Stack>
          </>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
    </section>
  );
};

export default Movies;
