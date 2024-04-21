const path = require('path')

module.exports = (inputPath) => {
  return path.basename(inputPath)
}