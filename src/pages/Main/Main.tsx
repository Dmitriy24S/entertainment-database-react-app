import React, { useContext } from "react";
import { AppContext } from "../../App";
import MediaCard from "../../components/MediaCard/MediaCard";
import { AppContextType, MediaDataType } from "../../types";

const Main = () => {
  const { dataPopularMovies, dataTrendingTv } = useContext(
    AppContext
  ) as AppContextType;

  return (
    <>
      {/* Movie section */}
      <section className="list">
        <h1 className="list-name">Popular movies</h1>
        <div className="list-items">
          {dataPopularMovies.map((mediaItem: MediaDataType, index: number) => {
            // Put "-"" instead space in movie title for url:
            const urlName = mediaItem.title
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/gi, "");

            return (
              <MediaCard
                mediaItem={mediaItem}
                urlName={urlName}
                title={mediaItem.title}
                mediaType={"movie"}
                key={mediaItem.id}
              />
            );
          })}
        </div>
      </section>

      {/* Trending TV section */}
      <section className="list">
        <h1 className="list-name">Trending shows</h1>
        <div className="list-items">
          {dataTrendingTv?.map((mediaItem: MediaDataType, index: number) => {
            // Put "-"" instead space in movie title for url:
            const urlName = mediaItem.original_name
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/gi, "");
            return (
              <MediaCard
                mediaItem={mediaItem}
                urlName={urlName}
                title={mediaItem.original_name}
                mediaType={"tv"}
                key={mediaItem.id}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Main;
