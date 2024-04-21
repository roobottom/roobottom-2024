const moment = require('moment')

module.exports = (value, dateFormat = 'D MMMM YYYY') => {
  return moment(value).format(dateFormat) 
}