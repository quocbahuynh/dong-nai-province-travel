const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    await ReadData.create(req.body)
    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .redirect("/admin/database/post");
}
