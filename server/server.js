const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const { generateMessage, generateLocationMessage} = require("./utils/message")
const {isRealString} = require("./utils/validation")
const {Users} = require('./utils/users')

//Setting up the http server and enabling web sockets on it
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000
let users = new Users()

//middleware
app.use(express.static(publicPath))


io.on('connection',(socket)=>{
  console.log('New user connected')

  socket.on('join', (params, callback) => {
    console.log('received params from a new user', params)
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback(`Please enter a valid name and room name`)
    }
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUserList',users.getUserList(params.room))
    socket.emit('newMsg', generateMessage('Admin', 'Welcome to Chat App'))
    socket.broadcast.to(params.room).emit('newMsg', generateMessage('Admin', `${params.name} has joined`))

    callback()
  })

  socket.on('createMsg', (msg, callback) => {
    console.log('createMsg', msg)
    io.emit('newMsg', generateMessage(msg.from, msg.text))
    callback()
  })

  socket.on('createLocation',(location,callback)=>{
    callback('from:Admin  location message received')
    socket.broadcast.emit('newLocationMsg', generateLocationMessage(location.from, location.latitude,location.longitude))
  })


  socket.on('disconnect',()=>{
    const user = users.removeUser(socket.id)
    console.log(user)
    console.log(user.roomName)
    if (user){
      io.to(user.roomName).emit('updateUserList', users.getUserList(user.roomName))
      io.to(user.roomName).emit('newMsg', generateMessage('Admin', `${user.name} left the room`))
    }
    console.log('User disconnected')
  })
})


server.listen(port,()=>{
  console.log(`Server listening on port ${port}`)
})




