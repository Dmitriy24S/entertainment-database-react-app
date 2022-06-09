import React, { useContext } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { AppContext } from "../../App";
import NavBookmarkIcon from "../../images/icon-nav-bookmark.svg";
import "./Bookmarks.scss";

const Bookmarks = () => {
  const { bookmarkedItems, addToBookmarks } = useContext<any>(AppContext);

  return (
    <section className="list bookmark-list">
      <h1 className="list-name">Bookmarks</h1>
      <div className="movie-list-container">
        {bookmarkedItems.map((item: any, index: number) => {
          const userScore = item?.vote_average * 10;
          return (
            <article className="movie-card bookmark-movie-card" key={item.id}>
              <button
                onClick={() => addToBookmarks(item)}
                className="bookmark-btn unbookmark"
                aria-label="remove from bookmarks this movie"
              >
                <img src={NavBookmarkIcon} alt="" />
              </button>
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
      </div>
    </section>
  );
};

export default Bookmarks;
