const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const TravelPosts = new Schema({
    province: String,
    logo: String,
    img1: String,
    img2: String,
    text1: String,
    text2: String,
    text3: String,
    img3: String,
    text4: String,
    text5: String,
    text6: String,
    img4: {
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
        photo11: String,
        photo12: String,
        photo13: String,
        photo14: String,
        photo15: String,
    },
    text7: String,
    text8: String,
    img5: {
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
        photo11: String,
        photo12: String,
        photo13: String,
        photo14: String,
        photo15: String,
    },
    text9: String,
    slug: { type: String, slug: "province" }
});
//TravelPosts.index({ province: 'text' });
const TravelPost = mongoose.model('TravelPost', TravelPosts);
module.exports = TravelPost;
