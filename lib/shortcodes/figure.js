const img = require('./img.js')
const attrs = require('./attrs.js')
const path = require('path')

/**
 * Constructs an HTML figure element with an image and optional caption and link.
 * @param {Object} params - The parameters for the figure and image elements.
 * @param {string} params.url - The URL of the image.
 * @param {string} params.caption - The caption for the figure; if absent, no figcaption is created.
 * @param {string} params.classes - CSS classes to apply to the figure element.
 * @param {string} [params.link=null] - Optional URL to make the image a clickable link.
 * @param {string} [params.transform='default'] - Transformation type to apply to the image URL. Defaults to 'default'.
 * @param {boolean} [params.isLocal=false] - Flag to indicate if the image is hosted locally. Defaults to false.
 * @returns {string} An HTML string representing a figure element with nested img and optional figcaption elements.
 */

module.exports = function(params) {
  return `
<figure ${attrs({'class':params.classes})}>
  ${params.link ? '<a href="' + params.link + '">' : ''}
  ${img({
    url: params.url,
    attrs: {
      id: path.basename(params.url, path.extname(params.url)) 
    },
    transform: params.transform || 'default',
    isLocal: params.isLocal,
  })}
  ${params.link ? '</a>' : ''}
  ${figcaption(params.caption)}
</figure>
  `
}

/**
 * Creates an HTML figcaption element.
 * @param {string} caption - The text content for the figcaption element.
 * @returns {string} An HTML figcaption element, or an empty string if no caption is provided.
 */
const figcaption = (caption) => {
  return caption ? `<figcaption>${caption}</figcaption>` : ''
}