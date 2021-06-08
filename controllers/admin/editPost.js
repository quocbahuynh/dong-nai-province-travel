const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    const editpost = await ReadData.findOne({ _id: req.params.id })
    res
    .set("Content-Security-Policy", "'default-src 'self''; style-src 'self' http://*; script-src 'self' http://*")
    .render('admin/edit', {
        editpost
    })
}