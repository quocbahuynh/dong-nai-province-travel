const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const TravelPosts = new Schema({
    district: String,
    logo: String,
    img1: String,
    img2: String,
    text1: String,
    img3: String,
    text2: String,
    text3: String,
    img4: String,
    text4: String,
    img5: String,
    text5: String,
    text6: String,
    img6: {
        type: { type: String },
        photo1: String,
        photo2: String,
        photo3: String,
        photo4: String,
        photo5: String,
        photo6: String,
    },
    text7: String,
    text8: String,
    text9: String,
    img7: {
        type: { type: String },
        photo1: String,
        photo2: String,
        photo3: String,
        photo4: String,
        photo5: String,
        photo6: String,
        photo7: String,
        photo8: String,
        photo9: String,
        photo10: String,
    },
    text10: String,
    iframe: String,
    slug: { type: String, slug: "district" }
});
//TravelPosts.index({ province: 'text' });
const TravelPost = mongoose.model('TravelPost', TravelPosts);
module.exports = TravelPost;
