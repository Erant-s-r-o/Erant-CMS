export const idGenerator = () => {
  return JSON.stringify(Date.now() * Math.floor(Math.random() * 100000))
}
