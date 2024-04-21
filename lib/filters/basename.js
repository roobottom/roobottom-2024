const path = require('path')

module.exports = url => {
  return path.basename(url, path.extname(url))
}