const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, './demo.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const demoProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(demoProto.DemoService.service, {
  getProfile: (_, callback) => {
    callback(null, {
      id: 1,
      name: 'Mike B.',
      title: 'Software Engineer',
      company: 'Diligent Corp.',
    });
  },

  getLocation: (_, callback) => {
    callback(null, {
      country: 'CA',
      state: 'BC',
      city: 'Richmond',
      timezone: 'PST',
    });
  },

  getHistory: (call) => {
    for (const entry of [
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
    ]) {
      call.write(entry);
    }

    call.end();
  },
});

server.bindAsync('0.0.0.0:13007', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Demo 7 Server (gRPC) started');
  server.start();
});
