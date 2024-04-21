const alphabetFromTags = require('./filters/alphabet-from-tags.js')
const basename = require('./filters/basename.js')
const collage = require('./filters/collage.js')
const dateDiff = require('./filters/date-diff.js')
const date = require('./filters/date.js')
const daysToPeriod = require('./filters/days-to-period.js')
const firstSentence = require('./filters/first-sentence.js')
const getFilename = require('./filters/get-filename.js')
const getIndex = require('./filters/getIndex.js')
const transform = require('./filters/image-transform.js')
const leadingZero = require('./filters/leading-zero.js')
const numberToWords = require('./filters/number-to-words.js')
const plural = require('./filters/plural.js')
const similarPosts  = require('./filters/similar-posts.js')
const slugify = require('./filters/slugify.js')
const smartypants = require('./filters/smartypants.js')
const timeAgo = require('./filters/time-ago.js')

module.exports = {
  alphabetFromTags,
  basename,
  collage,
  dateDiff,
  date,
  daysToPeriod,
  firstSentence,
  getFilename,
  getIndex,
  transform,
  leadingZero,
  numberToWords,
  plural,
  similarPosts,
  slugify,
  smartypants,
  timeAgo
}