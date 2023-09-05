import { io } from 'socket.io-client';
const URL = 'https://anoni-chat.onrender.com';
export const socket = io(URL);