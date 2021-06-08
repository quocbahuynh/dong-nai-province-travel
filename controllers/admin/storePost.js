const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    const readposts = await ReadData.find({}).sort({ _id: -1 }).limit(20)
    res
    .set("Content-Security-Policy", "'default-src 'self''; style-src 'self' http://*; script-src 'self' http://*")
    .render('admin/index', {
        readposts,
    })
}
