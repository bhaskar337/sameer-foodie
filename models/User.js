var mongoose = require('mongoose');
var itemSchema = require('./ItemSchema');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    items: {
        type: [itemSchema]
    },
    user_type: {
        type: String,
        default: 'user'
    },
    saved_recipes: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;