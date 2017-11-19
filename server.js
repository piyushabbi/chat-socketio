const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);
const port = process.env.port || 3000;

let users = [];
let connections = [];

server.listen(port);
console.log('Server running on port ', port);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(`Connected ${connections.length} sockets`);

    // Disconnect
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log(`Disconnected Socket. ${connections.length} socket(s) remaining.`);
    });

    // Send Message
    socket.on('send message', (data) => {
        io.sockets.emit('new message', {
            msg: data
        })
    });
});
