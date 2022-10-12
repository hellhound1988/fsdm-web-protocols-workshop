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
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

app.get('/api/blob', function (req, res) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'sample.json'), { encoding: 'utf-8' }));
  res.send(data);
});

app.get('/api/stream', function (req, res) {
  const stream = fs.createReadStream(path.join(__dirname, 'sample.json'), {
    encoding: 'utf-8',
  });
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  stream.pipe(res);
});

app.listen(13002, () => {
  console.log('Demo 2 Server (Streaming) started');
});

// ADD LINKEDIN / EMAIL
