import { io } from 'socket.io-client';

/* ✅ Do NOT auto connect */
export const socket = io('http://localhost:5000', {
  autoConnect: false,
  withCredentials: true,
});
