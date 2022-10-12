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
const spdy = require('spdy');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

app.get('/style.css', function (req, res) {
  setTimeout(() => {
    res.setHeader('Content-Type', 'text/css');
    res.send(`body {
      font-family: Arial;
      font-size: 16px;
      margin:0 auto;
      width:40em;
  }

  table.logs {
      width:100%;
  }`);
  }, 500 + Math.random() * 1000);
});

spdy
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'server.key')),
      cert: fs.readFileSync(path.join(__dirname, 'server.crt')),
    },
    app
  )
  .listen(13005, () => {
    console.log('Demo 5 Server (HTTP/2) started');
  });
