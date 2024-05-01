const styles = require('../../src/data/styles');

module.exports = (req, res, next) => {

    const defaultStyle = `/css/${styles[0].slug}`;
    let userStyle = null;
    if(req.cookies['userStyle']) {
        userStyle = req.cookies['userStyle'];
    }
    
    res.locals.userStyle = userStyle || defaultStyle;

    next();

}