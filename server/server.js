const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const {generateMessage} = require("./utils/message")

//Setting up the http server and enabling web sockets on it
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000

//middleware
app.use(express.static(publicPath))


io.on('connection',(socket)=>{
  console.log('New user connected')
  socket.emit('newMsg', generateMessage('Admin', 'Welcome to Chat App'))
  socket.broadcast.emit('newMsg', generateMessage('Admin', 'New user joined'))

   socket.on('createMsg',(msg,callback)=>{
     console.log('createMsg',msg)
     socket.broadcast.emit('newMsg', generateMessage (msg.from, msg.text))
     callback('From Server: Got it')
   })

  socket.on('disconnect',()=>{
    console.log('User disconnected')
  })
})


server.listen(port,()=>{
  console.log(`Server listening on port ${port}`)
})




