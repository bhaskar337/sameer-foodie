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

router.get('/organise', function (req, res, next) {
    var items = req.user.items;
    console.log('Items', items);
    Recipe.findByItems(items, function (results) {
        results.push({ratio: 0.4});
        results.sort(function(a, b) {
            return a.ratio-b.ratio;
        });
        res.send(results);
    })
});

module.exports = router;
