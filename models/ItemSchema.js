var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.ObjectId,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = itemSchema;