const attrs = require('./attrs.js')
const transforms = require('./transforms.js')

/**
 * Generates an HTML img element with specified attributes and transformations.
 * @param {Object} params - The parameters for generating the img tag.
 * @param {string} params.url - The URL of the image.
 * @param {Object} params.attrs - HTML attributes for the img element, such as class and style.
 * @param {string} [params.transform='default'] - The type of transformation to apply to the image URL. Defaults to 'default'.
 * @param {boolean} [params.isLocal=false] - Flag to indicate if the image is hosted locally. Defaults to false.
 * @returns {string} An HTML string representing an img element.
 */
module.exports = function(params) {

  //set defaults
  if (!params.transform) {
    params.transform = 'default'
  }
  if (!params.isLocal) {
    params.isLocal = false
  }

  let src = transforms(params.url, params.transform)
  if (params.isLocal) {
    src = params.url
  }

  return `<img src="${src}" ${attrs(params.attrs)} loading="lazy" decoding="async">`
}