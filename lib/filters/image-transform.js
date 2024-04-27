const transforms = require('../transforms.js')
module.exports = function(url, transform) {
  return url + transforms[transform]
}