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
    name: String,
    category: String,
    ingredients: [itemSchema],
    steps: [String],
    img_url: String,
    reviews: [reviewSchema],
    images: [String]
});

recipeSchema.statics.findByItems = function(items, callback) {
    return this.find(function (err, recipes) {
        console.log(recipes);
        var commons = [];
        recipes.forEach(function (recipe, index) {
            var originalCount = recipe.ingredients.length;
            var ingr = recipe.ingredients.map(mapToId);
            var it = items.map(mapToId);
            var commonValues = it.filter(function(value) { 
                                   return ingr.indexOf(value) != -1;
                               });

            var ratio = commonValues.length / originalCount;
            commons.push({
                recipe: recipe,
                commonValues: commonValues,
                ratio: ratio
            });
        });
        console.log(commons);
        callback(commons);
    });
}

function mapToId(i) {
    return new String(i.item_id).valueOf();
}

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;