 var express = require('express');

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
//var mongodb=require('mongodb');



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

      //store in database

  //    storeMessage(data);


  });
});

/*
function loadMessages(user,to,callback){

  console.log("loading messages");

  var MongoClient = mongodb.MongoClient;
 
  // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/dating';
 
  // Connect to the server
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the Server', err);
      }
      else {
      // We are connected
        console.log('Connection established to', url);
   
      // Get the documents collection
        var collection = db.collection('chat');

        collection.findOne({"members":{$all:[user,to]}},function(err,result){
          db.close();
          return callback(result);
        });
   
      }
  });

}

function storeMessage(data){

  console.log("storing message");

  var MongoClient = mongodb.MongoClient;
 
  // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/dating';
 
  // Connect to the server
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the Server', err);
      }
      else {
      // We are connected
        console.log('Connection established to', url);
   
      // Get the documents collection
        var collection = db.collection('chat');

    // store message in database
        collection.update({"members":{$all:[data.user,data.to]}},{$push:{ messages:{ $each:[{"from":0,"msg":data.message}] ,$position:0 }}},function (err, result) {
         
        //Close connection
          db.close();
      });
    }
  });

}*/

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});
