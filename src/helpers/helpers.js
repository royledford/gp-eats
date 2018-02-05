/** Generate a pseudo unique ID
 * THIS IS NOT A GUID
 *
 * From https://gist.github.com/gordonbrander/2230317
 */
export const uid = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9)
}

/** Get the informal street address from a full address */
export const getShortAddress = address => {
  const parser = require('parse-address')
  const addressObj = parser.parseLocation(address)
  return `${addressObj.number} ${addressObj.prefix} ${addressObj.street} ${addressObj.type}`
}
