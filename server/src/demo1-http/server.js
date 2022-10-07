const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/profile', function (req, res) {
  res.send({
    id: 1,
    name: 'Mike B.',
    title: 'Software Engineer',
    company: 'Diligent Corp.',
  });
});

app.get('/api/location', function (req, res) {
  res.send({
    country: 'CA',
    state: 'BC',
    city: 'Richmond',
    timezone: 'PST',
  });
});

app.get('/api/history', function (req, res) {
  res.send({
    data: [
      {
        id: 1,
        time: '2022-09-01 12:00:00',
        entry: 'User logged in',
      },
      {
        id: 2,
        time: '2022-09-01 12:01:00',
        entry: 'User created resource A',
      },
      {
        id: 3,
        time: '2022-09-01 12:01:15',
        entry: 'User created resource B',
      },
      {
        id: 4,
        time: '2022-09-01 12:01:30',
        entry: 'User destroyed resource A',
      },
      {
        id: 5,
        time: '2022-09-01 12:02:00',
        entry: 'User logged out',
      },
    ],
  });
});

app.listen(13001, () => {
  console.log('Demo 1 Server (HTTP) started');
});
