module.exports = async (req, res) => {
    res
    .set("Content-Security-Policy", "'default-src 'self''; style-src 'self' http://*; script-src 'self' http://*")
    .render('client/index');
}