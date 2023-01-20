import Tooltip from '@mui/material/Tooltip'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '../../App'
import NavBookmarkIcon from '../../images/icon-nav-bookmark.svg'
import NavHomeIcon from '../../images/icon-nav-home.svg'
import NavMoviesIcon from '../../images/icon-nav-movies.svg'
import NavTvIcon from '../../images/icon-nav-tv-series.svg'
import ProfileIcon from '../../images/image-avatar.png'
import Logo from '../../images/logo.svg'
import { AppContextType } from '../../types'

import './Header.scss'

const Header = () => {
  const { activeMenu, setActiveMenu } = useContext(AppContext) as AppContextType

  let location = useLocation()

  return (
    <header className='App-header'>
      <div className='header-container'>
        <div className='header-inner'>
          <div className='header-content'>
            <Link to={'/'} onClick={() => setActiveMenu('home')}>
              <img src={Logo} alt='' />
            </Link>
            <ul className='nav-menu'>
              <li>
                <Tooltip title='Home'>
                  {/* // TODO: keep or fix: on refresh if on media details page -> no active category? */}
                  <Link
                    to={'/'}
                    // set style active category by url + after go to media details keep active category style (can go back to category with btn + keep track current media category?)
                    // e.g.: on Bookmarks page -> Bookmarks category style active -> select bookmarked media -> view media details -> keep bookmarks category active for visual guidance of media source is bookmarks -> and go back button in media details will return to bookmarks page
                    className={
                      location.pathname === '/' || activeMenu === 'home'
                        ? 'active-menu'
                        : ''
                    }
                    onClick={() => setActiveMenu('home')}
                  >
                    <img src={NavHomeIcon} alt='' />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title='Movies'>
                  <Link
                    to={'/movies'}
                    className={
                      location.pathname === '/movies' || activeMenu === 'movies'
                        ? 'active-menu'
                        : ''
                    }
                    onClick={() => setActiveMenu('movies')}
                  >
                    <img src={NavMoviesIcon} alt='' />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title='Tv Shows'>
                  <Link
                    to={'/tv'}
                    className={
                      location.pathname === '/tv' || activeMenu === 'tv'
                        ? 'active-menu'
                        : ''
                    }
                    onClick={() => setActiveMenu('tv')}
                  >
                    <img src={NavTvIcon} alt='' />
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip title='Bookmarks'>
                  <Link
                    to={'/bookmarks'}
                    className={
                      location.pathname === '/bookmarks' || activeMenu === 'bookmarks'
                        ? 'active-menu'
                        : ''
                    }
                    onClick={() => setActiveMenu('bookmarks')}
                  >
                    <img src={NavBookmarkIcon} alt='' />
                  </Link>
                </Tooltip>
              </li>
            </ul>
            <img src={ProfileIcon} alt='' className='user-profile-icon' />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
