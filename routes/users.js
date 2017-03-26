var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('./../models/User');

/* GET users listing. */

router.get('/', function (req, res, next) {
    console.log(req.user);
    res.render('profile', req.user);
});

module.exports = router;
