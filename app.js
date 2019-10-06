const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server has started`);
});