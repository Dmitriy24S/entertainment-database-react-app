import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import NavBookmarkIcon from "../../images/icon-nav-bookmark.svg";
import { AppContextType, MediaDataType } from "../../types";

interface MediaCardProps {
  mediaItem: MediaDataType;
  urlName: string;
  title: string;
  mediaType: string;
}

const MediaCard = ({
  mediaItem,
  urlName,
  title,
  mediaType,
}: MediaCardProps) => {
  const { addToBookmarks, checkInBookmarksStatus } = useContext(
    AppContext
  ) as AppContextType;
  return (
    <article className="movie-card">
      {/* Bookmark button */}
      {checkInBookmarksStatus(mediaItem) ? (
        <button
          onClick={() => addToBookmarks(mediaItem)}
          className="bookmark-btn unbookmark"
          aria-label="remove from bookmarks this movie"
        >
          <img src={NavBookmarkIcon} alt="" className="bookmark-icon" />
        </button>
      ) : (
        <button
          onClick={() => addToBookmarks(mediaItem)}
          className="bookmark-btn"
          aria-label="add bookmark this movie"
        >
          <img src={NavBookmarkIcon} alt="" className="bookmark-icon" />
        </button>
      )}
      <img
        src={`https://www.themoviedb.org/t/p/w440_and_h660_face${mediaItem.poster_path}`}
        alt={`${title} poster`}
        className="movie-poster"
      />
      <Link
        to={`/entertainment-database-react-app/${mediaType}/${mediaItem.id}-${urlName}`}
        state={[mediaItem.id, mediaType]}
      >
        <h4 className="movie-card-title">{title}</h4>
      </Link>
    </article>
  );
};

export default MediaCard;
