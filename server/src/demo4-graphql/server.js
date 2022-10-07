const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(cors());

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Profile {
    id: Int
    name: String
    title: String
    company: String
  }
  type Location {
    country: String
    state: String
    city: String
    timezone: String
  }
  type HistoryEntry {
    id: Int
    time: String
    entry: String
  }
  type History {
    data: [HistoryEntry]
  }
  type Query {
    profile: Profile
    location: Location
    history: History
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  profile: () => {
    return {
      id: 1,
      name: 'Mike B.',
      title: 'Software Engineer',
      company: 'Diligent Corp.',
    };
  },
  location: () => {
    return {
      country: 'CA',
      state: 'BC',
      city: 'Richmond',
      timezone: 'PST',
    };
  },
  history: () => {
    return {
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
    };
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
  })
);

app.listen(13004, () => {
  console.log('Demo 4 Server (GraphQL) started');
});
