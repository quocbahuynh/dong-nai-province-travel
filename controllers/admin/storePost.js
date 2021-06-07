const ReadData = require('../../models/ReadData');

module.exports = async (req, res) => {
    const readposts = await ReadData.find({}).sort({ _id: -1 }).limit(20)
    res.render('admin/index', {
        readposts,
    })
}
