const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    const editpost = await ReadData.findOne({ _id: req.params.id })
    res
    .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval' 'report-uri /csp_report_parser'")
    .render('admin/edit', {
        editpost
    })
}