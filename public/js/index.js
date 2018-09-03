//Initiate a connection from client to server for a web socket connection and keep that connection open
const socket = io()
socket.on('connect', () => {
  console.log('Connected to Server')
})

socket.on('newMsg',(msg)=>{
  console.log('Received chat from the server',msg)
  var li = jQuery('<li></li>')
  li.text(`${msg.from}: ${msg.text}`)
  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault()
  socket.emit('createMsg',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },(ack)=>{
    console.log(ack)
  })
})

socket.on('disconnect', () => {
  console.log('Server disconnected')
})
