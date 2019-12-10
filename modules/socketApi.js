var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('message', function(msg){
    console.log('message: ' + msg);
  });
});

socketApi.emit = function(channel, msg) {
    io.sockets.emit(channel, msg);
}

module.exports = socketApi;
