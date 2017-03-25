var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    item_id: mongoose.Schema.ObjectId,
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