import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import ProfileIcon from '../../images/image-avatar.png'
import Logo from '../../images/logo.svg'

import { navLinks } from '../../const/navLinks'
import { useHeaderContext } from '../../context/ContextProvider'
import { NavLinkTitleEnum } from '../../types'
import NavLinkItem from '../NavLinkItem/NavLinkItem'

import './Header.scss'

const Header = () => {
  console.count('Header')

  const location = useLocation()
  const { activeMenu, setActiveMenu } = useHeaderContext()

  // Update activeMenu on fresh load on homepage
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      setActiveMenu(NavLinkTitleEnum.HOME)
    }
  }, [location.pathname, setActiveMenu])

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [activeMenu])

  return (
    <header className='App-header'>
      <div className='header-container'>
        <div className='header-content'>
          <Link to={'/'} onClick={() => setActiveMenu(NavLinkTitleEnum.HOME)}>
            <img src={Logo} alt='' />
          </Link>
          <ul className='nav-menu'>
            {navLinks.map((link) => (
              <li key={link.title}>
                <NavLinkItem title={link.title}>
                  <img src={link.icon} alt='' />
                </NavLinkItem>
              </li>
            ))}
          </ul>
          <img src={ProfileIcon} alt='' className='user-profile-icon' />
        </div>
      </div>
    </header>
  )
}

export default Header
