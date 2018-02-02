/** Generate a pseudo unique ID
 * THIS IS NOT A GUID
 *
 * From https://gist.github.com/gordonbrander/2230317
 */
export default (uid = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9)
})
