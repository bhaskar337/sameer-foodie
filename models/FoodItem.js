var mongoose = require('mongoose');

var foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    buy_link: String,
    non_veg: {
        type: Boolean,
        default: false
    }
});

foodItemSchema.statics.getByName = function (name, callback) {
    return this.find({name: new RegExp('^' + name, 'ig')}, callback);
}

var FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;