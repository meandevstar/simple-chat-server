const http = require('http');
const shortId = require('short-id');
const { uniqBy } = require('lodash');

let userMap = {};

const init = (app) => {
  const server = http.createServer(app);
  const io = require('socket.io')(server, {
    transport: ['websocket'],
    path: '/socket.io'
  });
  const port = process.env.SOCKET_PORT || 8001;
  server.listen(port);

  console.log(`========== Socket Server opened at port ${port} ==========`);

  io.on('connection', client => {
    console.log('========== client connected ==========');

    const currentUsers = getUsers();
    userMap[client.id] = {
      name: `User${currentUsers.length + 1}`,
      status: 'ONLINE'
    };

    io.emit('users.new', {
      id: client.id,
      ...userMap[client.id]
    });

    client.on('users.name', onNameChange(client))
    client.on('messages', onMessage(client));
    client.on('disconnect', onDisconnect(client));
  });

  const onMessage = (client) => (text) => {
    console.log('========== Message reveiced ==========');

    const sender = userMap[client.id];
    console.log(`Sender: ${sender.name}\nText: ${text}`);
    io.emit('messages.new', {
      sender: client.id,
      text,
      timestamp: Date.now()
    });
  }

  const onNameChange = (client) => (name) => {
    userMap[client.id].name = name;
    io.emit('users.new', {
      id: client.id,
      name,
      status: 'ONLINE'
    });
  }

  const onDisconnect = (client) => () => {
    console.log('============ client disconnected ============');
    userMap[client.id].status = 'OFFLINE';
    const users = getUsers()
    io.emit('users', users)
  }
}

const getUsers = () => {
  return uniqBy(
    Object.keys(userMap).map(id => ({ id, ...userMap[id] })),
    'id'
  );
}

module.exports = {
  init,
  getUsers
}