const ReadData = require('../../models/ReadData');
module.exports = async (req, res) => {
    const data = await ReadData.find({});

    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    .render('client/index', {data});
}