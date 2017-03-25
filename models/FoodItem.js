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
        type: String,
        required: true
    },
    convert: [convertSchema],
    buy_link: String,
    non_veg: {
        type: Boolean,
        default: false
    }
});

var FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;