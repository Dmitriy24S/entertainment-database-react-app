import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { AppContext } from "../../App";
import Spinner from "../../components/Spinner/Spinner";
import NavBookmarkIcon from "../../images/icon-nav-bookmark.svg";
import { AppContextType, MediaDataType, MovieListDataType } from "../../types";

const TvShows = () => {
  const { addToBookmarks, checkInBookmarksStatus } = useContext(
    AppContext
  ) as AppContextType;
  const [popularTvShows, setPopularTvShows] = useState<MovieListDataType>();
  const [selectedPage, setSelectedPage] = useState(1);
  const apiUrl = "https://api.themoviedb.org/3/tv/popular?api_key=";
  const apiKey = "b0574de2203f781e1f1bc82abcf3cd8d";

  // Fetch now playing movie list on page load
  useEffect(() => {
    const fetchNowPlayingMoviesData = async () => {
      try {
        const apiPopularTvShows = await axios.get(
          `${apiUrl}${apiKey}&language=en-US&page=${selectedPage}`
        );
        setPopularTvShows(apiPopularTvShows.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchNowPlayingMoviesData();
  }, [selectedPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selectedPage]);

  // Update selected page in pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSelectedPage(value);
  };

  return (
    <section className="list">
      <h1 className="list-name">Popular TV Shows</h1>
      <div className="movie-list-container">
        {popularTvShows ? (
          <>
            {popularTvShows.results.map(
              (item: MediaDataType, index: number) => {
                const userScore = item?.vote_average * 10;
                return (
                  <article className="movie-card" key={item.id}>
                    {/* Bookmark button */}
                    {checkInBookmarksStatus(item) ? (
                      <button
                        onClick={() => addToBookmarks(item)}
                        className="bookmark-btn unbookmark"
                        aria-label="remove from bookmarks this movie"
                      >
                        <img src={NavBookmarkIcon} alt="" />
                      </button>
                    ) : (
                      <button
                        onClick={() => addToBookmarks(item)}
                        className="bookmark-btn"
                        aria-label="add bookmark this movie"
                      >
                        <img src={NavBookmarkIcon} alt="" />
                      </button>
                    )}
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
                      {/* Movies API */}
                      {/* <h4 className="movie-title">{item.original_title}</h4> */}
                      {/* TV Shows API */}
                      <h4 className="movie-title">{item.original_name}</h4>
                      {/* Movies API */}
                      {/* <p className="movie-release-date">{item.release_date}</p> */}
                      {/* TV Shows API */}
                      <p className="movie-release-date">
                        {item.first_air_date}
                      </p>
                    </div>
                  </article>
                );
              }
            )}
            {/* Pagination */}
            <Stack spacing={2} className="pagination">
              <Pagination
                count={
                  popularTvShows.total_pages > 500
                    ? 500
                    : popularTvShows.total_pages
                  // api limit pages to 500
                }
                page={popularTvShows.page}
                onChange={handleChange}
              />
            </Stack>
          </>
        ) : (
          // <h2>Loading</h2>
          <Spinner />
        )}
      </div>
    </section>
  );
};

export default TvShows;
