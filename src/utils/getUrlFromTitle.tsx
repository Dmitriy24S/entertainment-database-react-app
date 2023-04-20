import { NavLinkTitleEnum } from '../types'

export const getUrlFromNavTitle = (title: NavLinkTitleEnum) => {
  switch (title) {
    case NavLinkTitleEnum.HOME:
      return '/'
    case NavLinkTitleEnum.TV:
      return '/tv'
    default:
      return `/${title}`
  }
}
