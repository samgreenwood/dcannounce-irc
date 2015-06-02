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

client.addListener("message", function (from, to, text, message) {
    if (text == "!recent") {
        http.get('http://dcannounce.goonwood.wan/api/recent', function (response) {
            response.on('data', function (data) {
                var channel = message.args[0];
                var announcements = JSON.parse(data);

                announcements.forEach(function (announcement) {
                    var size = filesize(announcement.size);
                    var announceString = sprintf("[%s] %s - %s - %s", announcement.site, announcement.filename, size, announcement.magnet);

                    client.say(channel, announceString);
                });


            })
        });
    }

    if (text.lastIndexOf("!as") > -1) {
        var data = text.substr(text.lastIndexOf("!as"), text.length);
        console.log(data);
    }
});

server.listen('54321')
