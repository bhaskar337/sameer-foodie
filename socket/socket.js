function onConnection(socket) {

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
        console.log(user, data);
        searchFoodItems(user, data, function (result) {
            console.log(result);
        });

    });


}

function searchFoodItems(user, data, callback) {
    callback(data);
}

function addFoodItem(data) {
    // add food item to the list
}

module.exports = onConnection;