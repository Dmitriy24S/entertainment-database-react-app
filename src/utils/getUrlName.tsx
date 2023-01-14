export const getUrlName = (mediaTitle: string) => {
  // Put "-" instead space in movie title for url:
  return mediaTitle
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/gi, '')
}
