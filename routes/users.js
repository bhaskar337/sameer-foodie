var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/User');
var Recipe = require('./../models/Recipe');

/* GET users listing. */

router.get('/', function (req, res, next) {
    console.log(req.user);
    res.render('profile', req.user);
});

router.get('/recipe/:id',function(req,res,next){

    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipe',{recipe:recipe});
    });
});     
router.get('/organise', function (req, res, next) {
    var items = req.user.items;
    console.log('Items', items);
    Recipe.findByItems(items, function (results) {
        results.sort(function(a, b) {
            return b.ratio-a.ratio;
        });

        results=[
            {
                recipe: {
                    _id:"58d7241d83868606bc3501da",
                    name:"as",
                    ingredients:[
                    {
                        item_id:"58d65238bed2c11954911f3e",
                        name:"a",
                        quantity:1
                    },
                    {
                        item_id:"58d65256bed2c11954911f3f",
                        name:"b",
                        quantity:3
                    }],
                    commanValues: ["58d65238bed2c11954911f3e"],
                    ratio: 0.5
                }
            },
            {
                recipe: {
                    _id:"58d7241d83868606bc3501da",
                    name:"asasa",
                    ingredients:[
                    {
                        item_id:"58d65238bed2c11954911f3e",
                        name:"a",
                        quantity:1
                    },
                    {
                        item_id:"58d65256bed2c11954911f3f",
                        name:"b",
                        quantity:3
                    }],
                    commanValues: ["58d65238bed2c11954911f3e"],
                    ratio: 0.5
                }
            }
        ];
        res.render('omm',{results:results});
    });
});

module.exports = router;
