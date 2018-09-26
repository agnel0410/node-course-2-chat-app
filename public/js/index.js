//Initiate a connection from client to server for a web socket connection and keep that connection open
const getFormatedTime= (createdAt) => {
  var formatedTime = moment(msg.createdAt).format('h:mm a')
  return formatedTime
} 

const socket = io()
socket.on('connect', () => {
  console.log('Connected to Server')
})

socket.on('newMsg',(msg)=>{
  console.log('Received chat from the server',msg)
  var formatedTime = moment(msg.createdAt).format('h:mm a')
  const messageTemplate=jQuery('#message-template').html()
  const html = Mustache.render(messageTemplate,{
    text:msg.text,
    from:msg.from,
    time:formatedTime
  })
  jQuery('#messages').append(html)
})

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault()
  var messageTextbox = jQuery('[name=message]')
  socket.emit('createMsg',{
    from: 'User',
    text: messageTextbox.val(),
  },(ack)=>{
    console.log(ack)
    messageTextbox.val('')
  })
})

const sendLocation= jQuery("#send-location")
sendLocation.on('click',(e)=>{
 if(!navigator.geolocation) return alert("Geolocation not supported by your browser")

  sendLocation.attr('disabled','disabled').text('Sending location...')
 
   navigator.geolocation.getCurrentPosition((position)=>{
    socket.emit('createLocation',{
      from: 'User',
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude,

    },(ack)=>{
      console.log(ack)
      sendLocation.removeAttr('disabled').text('Send location')      
    }
    )
   },(err)=>{
     return alert("Unable to find geolocation")
   })
 
})

socket.on('newLocationMsg',(msg)=>{
  var formatedTime = moment(msg.createdAt).format('h:mm a')
  const locationTemplate = jQuery('#location-template').html()
  const html=Mustache.render(locationTemplate,{
    from:msg.from,
    url:msg.url,
    time:formatedTime
  })
  jQuery('#messages').append(html)
})

socket.on('disconnect', () => {
  console.log('Server disconnected')
})
