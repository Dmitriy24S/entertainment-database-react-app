import Tooltip from '@mui/material/Tooltip'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import NavBookmarkIcon from '../../images/icon-nav-bookmark.svg'
import NavHomeIcon from '../../images/icon-nav-home.svg'
import NavMoviesIcon from '../../images/icon-nav-movies.svg'
import NavTvIcon from '../../images/icon-nav-tv-series.svg'
import ProfileIcon from '../../images/image-avatar.png'
import Logo from '../../images/logo.svg'

import './Header.scss'

const Header = () => {
  console.count('Header')
  const [activeMenu, setActiveMenu] = useState('/')

  const location = useLocation()

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [activeMenu])

  const NavLink = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const capitalizeStringFirstLetter = (str: string) => {
      return str.replace(/\w+/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      })
    }

    const capitelizedTitle = capitalizeStringFirstLetter(title)

    const getUrlHref = (title: string) => {
      switch (title) {
        case 'home':
          return '/'
        case 'tv shows':
          return '/tv'
        default:
          return `/${title}`
      }
    }

    // const urlHref = title === 'home' ? '/' : title === 'tv shows' ? '/tv' : `/${title}`
    const urlHref = getUrlHref(title)

    return (
      <Tooltip title={capitelizedTitle}>
        <Link
          to={urlHref}
          className={
            location.pathname === `/${title}` || activeMenu === title ? 'active-menu' : ''
          }
          onClick={() => setActiveMenu(title)}
        >
          {children}
        </Link>
      </Tooltip>
    )
  }

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
                <NavLink title='home'>
                  <img src={NavHomeIcon} alt='' />
                </NavLink>
              </li>
              <li>
                <NavLink title='movies'>
                  <img src={NavMoviesIcon} alt='' />
                </NavLink>
              </li>
              <li>
                <NavLink title='tv shows'>
                  <img src={NavTvIcon} alt='' />
                </NavLink>
              </li>
              <li>
                <NavLink title='bookmarks'>
                  <img src={NavBookmarkIcon} alt='' />
                </NavLink>
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
