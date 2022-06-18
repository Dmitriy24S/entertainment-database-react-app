import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Main from "./pages/Main/Main";
import MediaDetailsPage from "./pages/MediaDetailsPage/MediaDetailsPage";
import Movies from "./pages/Movies/Movies";
import TvShows from "./pages/TvShows/TvShows";
import { MediaDataType } from "./types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AppContext = createContext({});

function App() {
  const [dataPopularMovies, setDataPopularMovies] = useState<MediaDataType[]>(
    []
  );
  const [dataTrendingTv, setDataTrendingTv] = useState<MediaDataType[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<MediaDataType[]>([]);
  const [activeMenu, setActiveMenu] = useState("");

  // Fetch data on page load, popular movies, trending tv
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiDataPopularMovies = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=b0574de2203f781e1f1bc82abcf3cd8d&language=en-US&page=1"
        );
        const apiDataTrendingTv = await axios.get(
          "https://api.themoviedb.org/3/trending/tv/day?api_key=b0574de2203f781e1f1bc82abcf3cd8d&language=en-US&page=1"
        );
        setDataTrendingTv(apiDataTrendingTv.data.results);
        setDataPopularMovies(apiDataPopularMovies.data.results);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Add item to bookmarks
  const addToBookmarks = (obj: MediaDataType) => {
    // Check for matching item in bookmarks
    const findItem = bookmarkedItems.find(
      (bookmark) => Number(obj.id) === Number(bookmark.id)
    );
    if (findItem) {
      // If item already in bookmarks remove it
      setBookmarkedItems(bookmarkedItems.filter((item) => item.id !== obj.id));
    } else {
      // Add item
      setBookmarkedItems([...bookmarkedItems, obj]);
    }
  };

  // Check if item already in bookmarks true/false
  const checkInBookmarksStatus = (obj: MediaDataType) => {
    return bookmarkedItems.some(
      (item: MediaDataType) => Number(item.id) === Number(obj.id)
    );
  };

  // Update local storage bookmarks, add bookmark to localstorage
  useEffect(() => {
    if (bookmarkedItems.length > 0) {
      // prevents clearing localtorage on load
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkedItems));
    }
  }, [bookmarkedItems]);

  // Get local storage bookmarks
  useEffect(() => {
    const items = localStorage.getItem("bookmarks");
    if (items) {
      // if not null then get local storage bookmarks
      setBookmarkedItems(JSON.parse(items));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        dataPopularMovies,
        dataTrendingTv,
        bookmarkedItems,
        setBookmarkedItems,
        addToBookmarks,
        checkInBookmarksStatus,
        activeMenu,
        setActiveMenu,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <BrowserRouter>
            <Header />
            <main className="App-main">
              <Routes>
                <Route
                  path="/entertainment-database-react-app"
                  element={<Main />}
                />
                <Route
                  path="/entertainment-database-react-app/movie/:id"
                  element={<MediaDetailsPage />}
                />
                <Route
                  path="/entertainment-database-react-app/tv/:id"
                  element={<MediaDetailsPage />}
                />
                <Route
                  path="/entertainment-database-react-app/movies"
                  element={<Movies />}
                />
                <Route
                  path="/entertainment-database-react-app/tv"
                  element={<TvShows />}
                />
                <Route
                  path="/entertainment-database-react-app/bookmarks"
                  element={<Bookmarks />}
                />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
