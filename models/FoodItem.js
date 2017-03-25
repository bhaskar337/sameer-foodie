var mongoose = require('mongoose');

var convertSchema = new mongoose.Schema({
    name: String,
    ratio: Number
});

var foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    convert: [convertSchema],
    buy_link: String,
    veg: {
        type: Boolean,
        default: true
    }
});

var FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;