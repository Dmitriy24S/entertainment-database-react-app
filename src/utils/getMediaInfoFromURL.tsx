import { MediaType } from '../types'

export const extractMediaInfoFromURL = (pathname: string) => {
  const [mediaType, idString] = pathname.split('/').filter(Boolean) // split and filter out any empty strings // (2) ['movie', '315162-puss-in-boots-the-last-wish']
  // mediaType: movie
  // idString: 315162-puss-in-boots-the-last-wish
  const match = idString.match(/^\d+/) //  match media id number from url path, match one or more digits at the beginning of the string // match: ['315162', index: 0, input: '315162-puss-in-boots-the-last-wish', groups: undefined]

  const mediaId = match ? match[0] : null // mediaId: 315162
  return { mediaType: mediaType as MediaType, mediaId: mediaId as string }
}
