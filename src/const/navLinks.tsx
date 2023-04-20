import NavBookmarkIcon from '../images/icon-nav-bookmark.svg'
import NavHomeIcon from '../images/icon-nav-home.svg'
import NavMoviesIcon from '../images/icon-nav-movies.svg'
import NavTvIcon from '../images/icon-nav-tv-series.svg'

import { NavLinkTitleEnum } from '../types'

export const navLinks = [
  {
    title: NavLinkTitleEnum.HOME,
    icon: NavHomeIcon,
  },
  {
    title: NavLinkTitleEnum.MOVIES,
    icon: NavMoviesIcon,
  },
  {
    title: NavLinkTitleEnum.TV,
    icon: NavTvIcon,
  },
  {
    title: NavLinkTitleEnum.BOOKMARKS,
    icon: NavBookmarkIcon,
  },
]
