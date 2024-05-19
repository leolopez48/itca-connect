import express from "express";
// import { createServer } from 'node:http';
// import { Server } from 'socket.io';
import 'dotenv/config'
import routes from "./Routes/index.js";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import "./Configs/Database.js";


const app = express();

app.use(bodyParser.json({ limit: '200mb' }));
app.use(cors());
app.use(morgan("dev"));
app.use('/api', routes)
// const server = createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: '*'
//     }
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     // Listen for joining a room
//     socket.on('join room', (room) => {
//         socket.join(room);
//         socket.emit('joined', room);
//     });

//     // Listen for new messages from the client
//     socket.on('chat message', (msg, room) => {
//         console.log('message: ' + msg);
//         // Broadcast the message to all clients in the room
//         io.to(room).emit('chat message', msg);
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

app.listen(3000, () => {
    console.log('Server running on 3000')
})

// export default io;