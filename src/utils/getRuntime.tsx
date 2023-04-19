export const getRuntime = (minutesRuntime: number) => {
  const hours = minutesRuntime / 60
  const leftover = hours - Math.floor(hours)
  const minutes = Math.round(leftover * 60)

  return `${Math.floor(hours)}h ${minutes}m` // 1h 45m
}
