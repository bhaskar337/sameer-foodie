var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


// Register User
router.post('/register', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} 
	else {
		var newUser = new User({
			name: name,
			email:email,
			password: password
		});

		console.log("succesful");

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

//		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy({
	 	usernameField: 'email',
	},
  	function(username, password, done) {
   		User.getUserByUsername(username, function(err, user){
   			if(err) throw err;
   			if(!user){
   				return done(null, false, {message: 'Unknown User'});
   			}
   			User.comparePassword(password, user.password, function(err, isMatch){
   			if(err) throw err;
   			if(isMatch){
   				return done(null, user);
   			} 
   			else {
   				return done(null, false, {message: 'Invalid password'});
   			}
   		});
   	});
 }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });	
});

router.post('/login',
  	passport.authenticate('local'),
  	function(req, res) {
    	res.redirect('/users');
});


router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/users/login');
});



module.exports = router;