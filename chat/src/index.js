import express from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for joining a room
    socket.on('join room', (room) => {
        socket.join(room);
        socket.emit('joined', room);
    });

    // Listen for new messages from the client
    socket.on('chat message', (msg, room) => {
        console.log('message: ' + msg);
        // Broadcast the message to all clients in the room
        io.to(room).emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on 3000')
})

// export default io;