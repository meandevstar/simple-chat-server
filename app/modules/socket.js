const http = require('http')
const shortId = require('short-id')
const { uniqBy } = require('lodash')
const { JWTModule } = require('../lib')
const { User } = require('../database')

let userMap = {}

const init = (app) => {
  const server = http.createServer(app);
  const io = require('socket.io')(server, {
    transport: ['websocket'],
    path: '/socket.io'
  })
  const port = process.env.SOCKET_PORT || 8001
  server.listen(port)

  console.log(`========== Socket Server opened at port ${port} ==========`)

  io.on('connection', async client => {
    console.log('========== client connected ==========')

    if (client.handshake.query && client.handshake.query.token) {
      try {
        await auth(io, client, client.handshake.query.token)
      } catch (error) {
        console.log("Handshake error: ", error);
      }
    }

    const userId = client.userId

    client.on('users.name', onNameChange(io, userId))
    client.on('messages', onMessage(io, userId))
    client.on('disconnect', onDisconnect(io, userId))
  });
}

const auth = async (io, client, token) => {
  const tokenParsed = await JWTModule.verifyToken(token)

  client.userId = tokenParsed.id

  const user = await User.findById(client.userId).lean()

  userMap[tokenParsed.id] = {
    name: user.name,
  }

  io.emit('users.new', {
    ...user,
    status: 'ONLINE'
  })
}

const onMessage = (io, userId) => (text) => {
  console.log('========== Message reveiced ==========')

  const sender = userMap[userId]
  console.log(`Sender: ${sender.name}\nText: ${text}`)
  io.emit('messages.new', {
    sender: userId,
    text,
    timestamp: Date.now()
  })
}

const onNameChange = (io, userId) => async (name) => {
  const user = await User.findById(userId).select('-password');
  user.name = name;
  await user.save();

  io.emit('users.new', {
    ...user.toObject(),
    status: 'ONLINE'
  })
}

const onDisconnect = (io, userId) => async () => {
  console.log('============ client disconnected ============')
  userMap[userId].status = 'OFFLINE'
  const users = await User.find().select('-password').lean()
  io.emit('users', users.map(v => ({ ...userMap[v._id], ...v })))
}

module.exports = {
  init
}