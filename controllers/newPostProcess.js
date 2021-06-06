const ReadData = require('../models/ReadData');

module.exports = async (req, res) => {
    await ReadData.create(req.body)
    res.redirect('back');
}
