//Initiate a connection from client to server for a web socket connection and keep that connection open
const socket = io()
socket.on('connect', () => {
  console.log('Connected to Server')
})

socket.on('newMsg',(msg)=>{
  console.log('Received chat from the server',msg)
})

socket.on('disconnect', () => {
  console.log('Server disconnected')
})
