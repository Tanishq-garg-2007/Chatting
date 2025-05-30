// socket.js
import { io } from 'socket.io-client';

const socket = io("https://chatting-2-f3gz.onrender.com"); // one shared instance
export default socket;
