var five = require('johnny-five');
var http = require('http');
var express = require('express'),
    app = module.exports.app = express(),
    io = require('socket.io'),
    potentiometer, potentiometer2;

var board = new five.Board();
app.use(express.static('public'));

board.on('ready', function() {
    potentiometer = new five.Sensor({
        pin: 'A2',
        freq: 250
    });

    potentiometer2 = new five.Sensor({
        pin: 'A3',
        freq: 250
    });

    potentiometer.on('data', function() {
        var brightness = this.value;
        io.emit('brightness', {
            brightness: brightness
        });
    });

    potentiometer2.on('data', function() {
        var position = this.value;
        io.emit('position', {
            position: position
        });
    });
});

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.port || 8060;
server.listen(port);
console.log('App running on port ', port);