var socketio = require('socket.io');
var FoodItem = require('./../models/FoodItem');
var User = require('./../models/User');
var ItemSchema = require('./../models/ItemSchema');

function onConnect(socket) {

    //To join the conversation room
    socket.on('joinRoom', function(user) {
        console.log('joining room', user);
        socket.join(user);
    });

    socket.on('selectChat', function(user, to) {
        loadMessages(user, to, function(data) {
            socket.emit("loadMessages", data);
        });
    });

    //when any user sends a message
    socket.on('msg', function(data) {
        console.log('sending message from', data.user, 'to', data.to);
        socket.broadcast.to(data.to).emit('newmsg', { from: data.user, message: data.message });
    });

    socket.on('addFoodItem', function(data) {
        addFoodItem(data, function(result) {
            console.log(result);
            io.to(data.user_id).emit('addedFoodItem', result);
        });
    });

    socket.on('removeFoodItem', function(data) {
        removeFoodItem(data, function(result) {
            console.log(result);
            io.to(data.user_id).emit('removedFoodItem', result);
        });
    });

    socket.on('searchFoodItems', function(data) {

        searchFoodItems(data, function(result) {
            // console.log("Socket Recieve:", data);
            // console.log('Result:', result);
            io.to(data.user_id).emit('displayFoodItems', result);
        });
    });


}

function searchFoodItems(data, callback) {
    FoodItem.getByName(data.val, function(err, fooditems) {
        var items = [];
        fooditems.map(function(fooditem) {
            items.push({
                id: fooditem._id,
                name: fooditem.name
            });
        });
        callback(items);
    });

}

function addFoodItem(data, callback) {
    console.log(data);
    var user_id = data.user_id;
    var item_id = data.item_id;
    var item_name = data.item_name;
    var quantity = data.quantity;
    User.findById(user_id, function(err, user) {
        if (err) {
            return callback({ error: true, err: err });
        }

        var flag = false;
        for (var i in user.items) {
            if (user.items[i].item_id == item_id) {
                user.items[i].quantity += new Number(quantity);
                flag = true;
                break;
            }
        }
        if (!flag) {
            item = {
                item_id: item_id,
                name: item_name,
                quantity: quantity
            };
            user.items.push(item);
        }
        console.log(user);
        user.save(function(err) {
            if (err) {
                return callback({ error: true, err: err });
            }

            return callback({ error: false });
        })
    });
}

function removeFoodItem(data, callback) {
    var user_id = data.user_id;
    var item_id = data.item_id;
    var quantity = data.quantity;
    User.findById(user_id, function(err, user) {
        if (err) {
            return callback({ error: true, err: err });
        }

        var flag = false;
        for (var i in user.items) {
            if (user.items[i].item_id == item_id) {
                if (user.items[i].quantity < new Number(quantity))
                    return callback({ error: true, err: 'Quantity more than available.' });
                else
                    user.items[i].quantity -= new Number(quantity);
                flag = true;
                break;
            }
        }
        if (!flag) {
            return callback({ error: true, err: 'Item not available.' });
        }
        console.log(user);
        user.save(function(err) {
            if (err) {
                return callback({ error: true, err: err });
            }

            return callback({ error: false });
        })
    });
}

module.exports.listen = function(http) {
    io = socketio.listen(http);
    io.on('connection', onConnect);
}