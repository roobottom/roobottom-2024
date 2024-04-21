const _ = require('lodash')

module.exports = targetArray => {
  const firstLetters = targetArray.map(word => word.title.charAt(0))
  return _.sortedUniq(firstLetters)
}