// server/websocket-server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 4090 });

let clients = [];

server.on('connection', (ws) => {
   clients.push(ws);
   ws.on('message', (message) => {
      console.log('received: %s', message);
   });

   ws.on('close', () => {
      clients = clients.filter((client) => client !== ws);
   });
});

const broadcast = (data) => {
   clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
         client.send(data);
      }
   });
};

const notifyClients = (data) => {
   broadcast(JSON.stringify(data));
};

module.exports = notifyClients;
