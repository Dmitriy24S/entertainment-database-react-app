import React, { createContext, useEffect, useState } from "react";
import "./App.scss";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import MoviePage from "./pages/MoviePage/MoviePage";
import TvShows from "./pages/TvShows/TvShows";
import Movies from "./pages/Movies/Movies";
import Bookmarks from "./pages/Bookmarks/Bookmarks";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AppContext = createContext({});

function App() {
  const [dataPopularMovies, setDataPopularMovies] = useState<any[]>([]);
  const [dataTrendingTv, setDataTrendingTv] = useState<any[]>([]);

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

  return (
    <AppContext.Provider value={{ dataPopularMovies, dataTrendingTv }}>
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
                  element={<MoviePage />}
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
