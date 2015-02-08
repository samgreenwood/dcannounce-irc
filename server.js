var http = require('http');
var irc = require('irc');
var net = require('net');

var client = new irc.Client('localhost', 'Goonbot', {
  autoConnect: false
});

var server = net.createServer(function(socket) {
    socket.on('data', function(data)
    {
        client.say('#allthefiles', data);
    });
});

client.connect(5, function() {
  console.log("Connected!");
  client.join('#allthefiles', function() {
    console.log("Joined #allthefiles");
  });
});

server.listen('54321')

