import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import NavBookmarkIcon from "../../images/icon-nav-bookmark.svg";
import NavHomeIcon from "../../images/icon-nav-home.svg";
import NavMoviesIcon from "../../images/icon-nav-movies.svg";
import NavTvIcon from "../../images/icon-nav-tv-series.svg";
import ProfileIcon from "../../images/image-avatar.png";
import Logo from "../../images/logo.svg";

import "./Header.scss";

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-container">
        <div className="header-inner">
          <div className="header-content">
            <Link to={"/entertainment-database-react-app"}>
              <img src={Logo} alt="" />
            </Link>
            <ul className="nav-menu">
              <li>
                <Tooltip title="Home">
                  <Link to={"/entertainment-database-react-app"}>
                    <img src={NavHomeIcon} alt="" />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Movies">
                  <Link to={"/entertainment-database-react-app/movies"}>
                    <img src={NavMoviesIcon} alt="" />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Tv Shows">
                  <Link to={"/entertainment-database-react-app/tv"}>
                    <img src={NavTvIcon} alt="" />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Bookmarks">
                  <Link to={"/entertainment-database-react-app/bookmarks"}>
                    <img src={NavBookmarkIcon} alt="" />
                  </Link>
                </Tooltip>
              </li>
            </ul>
            <img src={ProfileIcon} alt="" className="user-profile-icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
