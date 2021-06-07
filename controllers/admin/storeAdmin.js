//process
const User = require('../../models/NewAdmin')
module.exports = async (req, res) => {
    console.log(req.body)
    await User.create(req.body, (error, user) => {
        res.redirect('/admin/database')
    })
}
