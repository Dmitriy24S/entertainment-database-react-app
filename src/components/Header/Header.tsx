import React from "react";
import Logo from "../../images/logo.svg";
import NavHomeIcon from "../../images/icon-nav-home.svg";
import NavBookmarkIcon from "../../images/icon-nav-bookmark.svg";
import NavMoviesIcon from "../../images/icon-nav-movies.svg";
import NavTvIcon from "../../images/icon-nav-tv-series.svg";
import ProfileIcon from "../../images/image-avatar.png";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-content">
        <Link to={"/entertainment-database-react-app"}>
          <img src={Logo} alt="" />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to={"/entertainment-database-react-app"}>
              <img src={NavHomeIcon} alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/entertainment-database-react-app/movies"}>
              <img src={NavMoviesIcon} alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/entertainment-database-react-app/tv"}>
              <img src={NavTvIcon} alt="" />
            </Link>
          </li>
          <li>
            <Link to={"/entertainment-database-react-app/bookmarks"}>
              <img src={NavBookmarkIcon} alt="" />
            </Link>
          </li>
        </ul>
        <img src={ProfileIcon} alt="" className="user-profile-icon" />
      </div>
    </header>
  );
};

export default Header;
