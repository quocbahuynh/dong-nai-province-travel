const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    const readposts = await ReadData.find({}).sort({ _id: -1 }).limit(20)
    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render('admin/index', {
        readposts,
    })
}
