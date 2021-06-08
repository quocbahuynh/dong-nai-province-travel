const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    await ReadData.deleteOne({ _id: req.params.id })
    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .redirect('back');
}