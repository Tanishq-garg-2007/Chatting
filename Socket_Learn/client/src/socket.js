// socket.js
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000"); // one shared instance
export default socket;
