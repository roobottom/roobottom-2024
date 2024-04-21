const moment = require('moment')

module.exports = (posts, date) => {
  let imageArray = []
  for (let post of posts) {
    if (moment(post.date).format('YYYY-MM-DD') == date && post.data.photo) {
      for (let image of post.data.photo) {
        imageArray.push(image)
      }
    }
  }
  return imageArray
}