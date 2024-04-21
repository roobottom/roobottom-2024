const moment = require('moment')

/**
 * 
 * @param {Date} firstDate A valid momentjs date
 * @param {Date} secondDate A valid momentjs date
 * @param {String} format A valid momentjs diff format string - defaults to 'days'
 * @returns the milliseconds between first and second dates
 */

module.exports = (firstDate, secondDate, format = 'days') => {
  let a = moment(firstDate)
  let b = moment(secondDate)
  return a.diff(b, format)
}