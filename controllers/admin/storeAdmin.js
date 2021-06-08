//process
const User = require('../../models/NewAdmin')
module.exports = async (req, res) => {
    await User.create(req.body, (error, user) => {
        res
        .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        .redirect('/admin/database')
    })
}
