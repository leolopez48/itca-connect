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

    socket.on('createRoom', () => {
        console.log('Room created');
    });
});

server.listen(3000, () => {
    console.log('Server running on 3000')
})

// export default io;