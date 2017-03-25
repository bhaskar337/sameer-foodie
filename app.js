 var express = require('express');
 var mongoose = require('mongoose');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

mongoose.connect('mongodb://localhost:27017/sameer_foodie');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

io.on('connection', function(socket){

  //To join the conversation room
  socket.on('joinRoom', function(user) {
      console.log('joining room', user);
      socket.join(user);

  });

  socket.on('selectChat',function(user,to){

    loadMessages(user,to,function(data){  
        socket.emit("loadMessages",data);
      });
  });

  //when any user sends a message
  socket.on('msg',function(data) { 

    console.log('sending message from',data.user,'to',data.to);

    socket.broadcast.to(data.to).emit('newmsg', {from:data.user, message:data.message});
  });

  socket.on('addFoodItem',function(data){
    addFoodItem(data);
  });

  socket.on('searchFoodItems',function(user,data){
    console.log(user,data);
    searchFoodItems(data,user,function(){
      
    });
   
  });


});

function searchFoodItems(data,callback){

  var result={

  }
  return callback(result);
}

function addFoodItem(data){
  // add food item to the list
}


http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
