module.exports = (res,req) => {
    return res.status(404).render('views/default.njk', {
        title: 'Page not found',
        introduction: 'That page can’t be found, soz.'
    })
}