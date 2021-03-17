export default function parseGetParams(str) {
  const query = str.slice(str.indexOf('?') + 1)
  const params = query.split('&')
  const obj = {}
  params.forEach(item => {
    const name = item.split('=')[0]
    const value = item.split('=')[1]
    obj[name] = decodeURI(value)
  })
  return obj
}