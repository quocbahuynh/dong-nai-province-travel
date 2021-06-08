const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    const editpost = await ReadData.findOne({ _id: req.params.id })
    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://*")
    .render('admin/edit', {
        editpost
    })
}