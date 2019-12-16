var socket_io = require('socket.io');
var io = socket_io();
var socketApi ={};
var telementary = {};

socketApi.io = io;

io.on('connection', function(socket){
  console.log('A user connected');
    for (const [key, value] of Object.entries(telementary)) { //send all stored telementary otherwise clients could wait up to 10sec to see data
      socketApi.emit(key, value);
    }

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

socketApi.emit = function(channel, msg) {
    try {
      telementary[channel] = msg;
    } catch (e) {
      console.log("Error updating telementary", e);
    }
    io.sockets.emit(channel, msg);
}

module.exports = socketApi;
