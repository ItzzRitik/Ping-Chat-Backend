const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');
const router = require('./router');

app.use(router);

io.on('connection', (socket) => {
    socket.on('join', ({name, room}, callback) => {
        
    });
    socket.on('disconnect', () => {
        console.log('User Left');
    });
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server has started`);
});