var socket = io();

var user='sayli';

function setUser(user){
  this.user=user;
  socket.emit('joinRoom',user);
}

function sendMessage(message,to){
  var user=this.user;
  if(message){
      socket.emit('msg', { user:user,to:to, message: message});
  }
  return false;
}

$(document).ready(function(){
  // SOCKET CODE
  $('.user').click(function(){
    var id=$(this).data('target');
    setUser(id);
  });
  
  socket.on('newmsg', function(data){
    recieveMessage(data);
  });
});