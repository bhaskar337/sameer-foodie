var express = require('express');
var router = express.Router();

var FoodItem = require('./../models/FoodItem');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('add_food_item', {saved: true});
});

router.post('/', function(req, res, next) {    
    var foodItem = new FoodItem(req.body);
    console.log(foodItem);
    foodItem.save(function(err) {
        if (err) {
            return res.send(err);
        }
        res.render('add_food_item', {saved: true})
    });
});

module.exports = router;