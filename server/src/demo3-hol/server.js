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

app.listen(13003, () => {
  console.log('Demo 3 Server (HOL) started');
});
