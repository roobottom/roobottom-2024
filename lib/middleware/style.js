const styles = require('../../src/data/styles');

module.exports = (req, res, next) => {

    let userStyle = req.cookies['userStyle'] ? req.cookies['userStyle'] : `${styles[0].slug}`;
    
    res.locals.userStyle =  userStyle;
    next();

}