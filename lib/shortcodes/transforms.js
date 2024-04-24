const transforms = require('../transforms.js')
module.exports = function(url, transform, server=process.env.IMG_SERVER) {
  return server + url + (transforms[transform] || transforms.default)
}