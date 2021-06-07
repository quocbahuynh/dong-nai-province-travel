const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    const editpost = await ReadData.findOne({ _id: req.params.id })
    res.render('admin/edit', {
        editpost
    })
}