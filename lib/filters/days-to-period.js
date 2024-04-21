module.exports = (d, format = 'years') => {
  let years = 0, months = 0, weeks = 0, days = 0, timeArray = {}

  while (d) {
    if (d >= 365) {
      years++;
      d -= 365;
    } else if (d >= 30) {
      months++;
      d -= 30;
    } else if (d >= 7) {
      weeks++;
      d -= 7;
    } else {
      days++;
      d--;
    }
  }

  timeArray = {
    days: days,
    weeks: weeks,
    months: months,
    years: years
  }
  return timeArray[format]
}