var mongoose = require('mongoose');
var itemSchema = require('./ItemSchema');

var reviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: String
});

var recipeSchema = new mongoose.Schema({
    category: String,
    ingredients: [itemSchema],
    steps: [String],
    img_url: String,
    reviews: [reviewSchema],
    images: [String]
});

var RecipeSchema = mongoose.model('Recipe', recipeSchema);

module.exports = RecipeSchema;