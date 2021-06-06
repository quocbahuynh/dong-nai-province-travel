const ReadData = require('../models/ReadData');

module.exports = async (req, res) => {
    await ReadData.updateOne({ _id: req.params.id }, req.body)
    res.redirect("/")
}
