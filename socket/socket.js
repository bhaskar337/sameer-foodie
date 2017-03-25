var socketio = require('socket.io');
var FoodItem = require('./../models/FoodItem');

function onConnect(socket) {

    //To join the conversation room
    socket.on('joinRoom', function (user) {
        console.log('joining room', user);
        socket.join(user);
    });

    socket.on('selectChat', function (user, to) {
        loadMessages(user, to, function (data) {
            socket.emit("loadMessages", data);
        });
    });

    //when any user sends a message
    socket.on('msg', function (data) {
        console.log('sending message from', data.user, 'to', data.to);
        socket.broadcast.to(data.to).emit('newmsg', { from: data.user, message: data.message });
    });

    socket.on('addFoodItem', function (data) {
        addFoodItem(data);
    });

    socket.on('searchFoodItems', function (user, data) {
        
        searchFoodItems(user, data, function (result) {
            // console.log("Socket Recieve:", user, data);
            // console.log('Result:', result);
            io.to(user).emit('displayFoodItems', result);
        });
    });


}

function searchFoodItems(user, data, callback) {
    FoodItem.getByName(data, function(err, fooditems) {
        var items = [];
        fooditems.map(function(fooditem){
            items.push({
                id: fooditem._id,
                name: fooditem.name
            });
        });
        callback(items);
    });
    
}

function addFoodItem(data) {
    // add food item to the list
}

module.exports.listen = function(http) {
    io = socketio.listen(http);
    io.on('connection', onConnect);
}