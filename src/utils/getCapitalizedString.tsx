export const getCapitalizedString = (str: string) => {
  return str.replace(/\w+/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}
