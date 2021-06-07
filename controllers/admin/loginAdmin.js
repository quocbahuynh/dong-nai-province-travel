//process
const bcrypt = require('bcrypt')
const User = require('../../models/NewAdmin')
module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // if passwords match
                    // store user session, will talk about it later
                    req.session.userId = user._id
                    res.redirect('/admin/database')
                }
                else {
                    res.redirect('/admin/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}
