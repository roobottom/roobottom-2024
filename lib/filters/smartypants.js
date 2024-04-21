const smartypants = require('smartypants')

module.exports = str => {
  return smartypants.smartypants(str, 1)
}