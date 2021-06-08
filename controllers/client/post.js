module.exports = async (req, res) => {
    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval' 'report-uri /csp_report_parser'")
    .render('client/post');
}