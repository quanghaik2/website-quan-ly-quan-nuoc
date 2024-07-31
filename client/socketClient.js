// client/socketClient.js

import io from 'socket.io-client';

// Replace with your server's URL
const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT);

// Function to connect to WebSocket server
export const connectWebSocket = () => {
  socket.on('connect', () => {
    console.log(`Connected to WebSocket server with id: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  // Handle custom events from server
  socket.on('server-message', (data) => {
    console.log(`Message from server: ${data}`);
  });

  return socket;
};

// Function to send messages to WebSocket server
export const sendMessage = (event, data) => {
  socket.emit(event, data);
};
