var express = require('express');
var router = express.Router();

var FoodItem = require('./../models/FoodItem');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('add_food_item');
});

router.post('/', function(req, res, next) {
    var foodItem
    FoodItem.save()
});

module.exports = router;