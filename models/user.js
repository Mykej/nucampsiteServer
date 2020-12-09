//importing a third party library
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;//use schema object

//mkaing a schema
const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});
//this is using line 7, meaning ut will automatically add username and password to your schema

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);