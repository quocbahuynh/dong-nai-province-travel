module.exports = async (req, res) => {
    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://*")
    .render('client/index');
}