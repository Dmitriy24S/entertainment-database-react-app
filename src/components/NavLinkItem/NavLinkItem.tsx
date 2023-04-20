import { Tooltip } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useHeaderContext } from '../../context/ContextProvider'
import { getCapitalizedString } from '../../utils/getCapitalizedString'
import { getUrlFromNavTitle } from '../../utils/getUrlFromTitle'

import { NavLinkTitleEnum } from '../../types'

const NavLinkItem = ({
  title,
  children,
}: {
  title: NavLinkTitleEnum
  children: React.ReactNode
}) => {
  const location = useLocation()
  const { activeMenu, setActiveMenu } = useHeaderContext()

  const capitelizedTitle = getCapitalizedString(title)
  const urlHref = getUrlFromNavTitle(title)

  return (
    <Tooltip title={capitelizedTitle}>
      <Link
        to={urlHref}
        className={
          // activeMenu === title ? 'active-menu' : ''
          location.pathname === urlHref || activeMenu === title ? 'active-menu' : '' // on fresh load page on home || movies || tv || bookmarks -> show active style for current category in Header / if navigate to category -> update active style in header
          // location.pathname === `/${title}` || activeMenu === title ? 'active-menu' : ''
        }
        onClick={() => setActiveMenu(title)} // when go from bookmarks to media details -> keep category link active style in header
      >
        {children}
      </Link>
    </Tooltip>
  )
}

export default NavLinkItem
