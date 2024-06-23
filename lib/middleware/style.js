const styles = require('../../src/data/styles');

module.exports = (req, res, next) => {
  //set users style from a cookie, or the first in the styles object
  let userStyle = req.cookies['userStyle'] ? req.cookies['userStyle'] : `${styles[0].slug}`;
  
  res.locals.userStyle = userStyle;
  next();
}