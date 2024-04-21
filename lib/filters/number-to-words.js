const numberToWords = require('number-to-words')

module.exports = (value, ordinal = false) => {
  return ordinal ? numberToWords.toWordsOrdinal(value) : numberToWords.toWords(value)
}