var http = require('http');
var irc = require('irc');
var net = require('net');
var sprintf = require('sprintf');
var filesize = require('filesize');

var client = new irc.Client('localhost', 'Goonbot', {
    autoConnect: false
});

var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        client.say('#allthefiles', data);
    });
});

client.connect(5, function () {
    client.join('#allthefiles');
});

server.listen('54321')
