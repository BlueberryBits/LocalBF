var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var requiredStringValidator = require('./Validators').requiredStringValidator;

var userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        validate: requiredStringValidator
    },
    first_name: {
        type: String,
        required: true,
        validate: requiredStringValidator
    },
    last_name: {
        type: String,
        required: true,
        validate: requiredStringValidator
    },
    company: {
        type: String,
        required: true,
        validate: requiredStringValidator
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
        default: Date.now
    },
    disabled_on: {
        type: Date
    },
    disabled: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    business: {
        type: String,
        default: "Distributor"
    }
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameQueryFields: ['email']
});

// Let other files use this module
module.exports = mongoose.model( 'User', userSchema );