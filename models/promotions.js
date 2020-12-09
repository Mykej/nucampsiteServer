const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// const promotionSchema = new Schema({
//         "name": "Mountain Adventure",
//         "image": "images/breadcrumb-trail.jpg",
//         "featured": true,
//         "cost": 1299,
//         "description": "Book a 5-day mountain trek with a seasoned outdoor guide! Fly fishing equipment and lessons provided."
//     }, {
//         timestamps: true
// });

// const promotionSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     featured: {
//         name: unique,
//         type: Boolean,
//         default: false
//     },
//     cost: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true,
//     },
// }, {
//     timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
// });

const promotionSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Promotion = mongoose.model('Promotion', promotionSchema)

module.exports = Promotion;