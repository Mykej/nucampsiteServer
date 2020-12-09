const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// const partnerSchema = new Schema({
//         "name": "Mongo Fly Shop",
//         "image": "images/mongo-logo.png",
//         "featured": false,
//         "description": "Need a new fishing pole, a tacklebox, or flies of all kinds? Stop by Mongo Fly Shop."
// }, {
//     timestamps: { createdAt: Date, updataedAt: Date }
// });

// const partnerSchema = new Schema({
//     createdAt: Number,
//     updatedAt: Number,
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     featured: {
//         name: unique,
//         type: Boolean,
//         default: false
//         },
//     }, {
//         timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } //check syntax
// });

const partnerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});


const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;