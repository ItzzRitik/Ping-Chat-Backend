const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);
const router = require('./router');

app.use(router);

io.on('connection', (socket) => {
    console.log('New Connection');
    socket.on('disconnect', () => {
        console.log('User Left');
    });
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server has started`);
});