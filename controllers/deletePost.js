const ReadData = require('../models/ReadData');

module.exports = async (req, res) => {
    await ReadData.deleteOne({ _id: req.params.id })
    res.redirect('back');
}