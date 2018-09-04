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

const sendLocation= jQuery("#send-location")
sendLocation.on('click',(e)=>{
 if(!navigator.geolocation) return alert("Geolocation not supported by your browser")
 else {
   navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('createLocation',{
      from: 'User',
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude
    },(ack)=>{
      console.log(ack)
    }
    )
   },(err)=>{
     return alert("Unable to find geolocation")
   })
 }
})

socket.on('newLocationMsg',(msg)=>{
  const li = jQuery('<li></li>')
  const a =jQuery('<a target="_blank">My current location</a>')
  li.text(`${msg.from}: `)
  a.attr('href',msg.url)
  li.append(a)
  jQuery('#messages').append(li)
})

socket.on('disconnect', () => {
  console.log('Server disconnected')
})
