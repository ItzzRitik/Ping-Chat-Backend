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
        const {error, user} = addUser({id: socket.id, name, room});
        if(error) return callback(error);
        
        socket.emit('message', {user: 'admin', text: `Hi ${user.name}, Welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has Joined!`});
        socket.join(user.room);
        io.to(user.room).emit('roomData', {room: user.room}, {users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user: user.name, text: message});
        io.to(user.room).emit('roomData',{room: user.room, users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`});
    });
});

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server has started`);
});