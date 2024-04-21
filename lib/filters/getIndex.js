const _ = require('lodash')

module.exports = (arr, haystack, needle) => {
  return _.findIndex(arr, (o) => o[haystack] == needle)
}