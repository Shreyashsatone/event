import { io } from 'socket.io-client';

const socket = io('https://event-czm8.onrender.com'); // Backend URL

export default socket;
