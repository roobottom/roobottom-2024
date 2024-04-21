const moment = require('moment');

module.exports = (date) => {
  const postDate = moment(date);
  const now = moment();
  const diffYears = now.diff(postDate, 'years');
  const diffMonths = now.diff(postDate, 'months');

  if (diffYears >= 1) {
    return `around ${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  } else if (diffMonths >= 1) {
    return `around ${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  } else {
    return "less than a month ago";
  }
}