const ReadData = require('../../models/ReadData');
module.exports = async (req, res) => {

    const postSlug = await ReadData.find({ slug: req.params.slug });
    
    res
        .set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
        .render('client/post', {
            postSlug: postSlug,
        });



}