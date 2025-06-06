import express from 'express'
import { Server } from 'socket.io'
import {createServer} from 'http'
import cors from 'cors'

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://chatting-ff.onrender.com",
        methods:["GET","POST"],
        credentials:"true"
    },
});

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello World");
})

io.on("connection",(socket)=>{
    console.log("User connected");
    console.log("Id",socket.id);

    socket.on("message",({message,room})=>{
        console.log(message);
        io.to(room).emit("receive-message",message);
    });

    socket.on("join-room",(room)=>{
        socket.join(room);
        console.log(`User Joined room ${room}`);
    });

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
    });
})

server.listen(3000,()=>{
    console.log("Server Is running on port 3000") 
})
