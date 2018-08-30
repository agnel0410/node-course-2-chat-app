const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

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

   socket.on('createMsg',(msg)=>{
     console.log('createMsg',msg)
     io.emit('newMsg',{
      from:msg.from,
      text:msg.text,
      createdAt: new Date().getTime()
    })
   })

  socket.on('disconnect',()=>{
    console.log('User disconnected')
  })
})


server.listen(port,()=>{
  console.log(`Server listening on port ${port}`)
})




