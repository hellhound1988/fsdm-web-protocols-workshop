/**
 * This example is prepared by Mikhail Beschastnov for
 * Full-Stack Developers Meetup (Web Protocols Workshop)
 * https://www.meetup.com/vancouver-full-stack-web-developers/
 *
 * If you have any questions or would like to connect, please find me:
 * - on LinkedIn: https://www.linkedin.com/in/mbeschastnov/
 * - over email: mike.beschastnov@gmail.com
 */
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(cors());

const server = http.createServer(app);

const wsServer = new WebSocket.Server({ server });

app.get('/api/long-polling', function (req, res) {
  setTimeout(() => {
    res.send(`Step ${req.query.step} is processed`);
  }, 3000 + Math.random() * 1000);
});

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    if (message == 'long_request') {
      setTimeout(() => {
        ws.send(`Step 1 is processed`);
        setTimeout(() => {
          ws.send(`Step 2 is processed`);
          setTimeout(() => {
            ws.send(`Step 3 is processed`);
          }, 3000 + Math.random() * 1000);
        }, 3000 + Math.random() * 1000);
      }, 3000 + Math.random() * 1000);
    } else {
      ws.send(`Unrecognized client message: ${message}`);
    }
  });
});

server.listen(13006, () => {
  console.log('Demo 6 Server (WebSocket) started');
});
