
const getFormatedTime= (createdAt) => {
  var formatedTime = moment(msg.createdAt).format('h:mm a')
  return formatedTime
} 


const scrollToBottom=()=>{
  //selectors
  const messages = jQuery('#messages')
  const newMessage = jQuery('li:last-child')
  //heights
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight=messages.prop('scrollHeight')
  var newMessageHeight=newMessage.innerHeight()
  var lastMessageHeight=newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight)
  }
}
//Initiate a connection from client to server for a web socket connection and keep that connection open
const socket = io()
socket.on('connect', () => {
  console.log('Connected to Server')
  var params=jQuery.deparam(window.location.search)
  socket.emit('join',params,(err)=>{
    if (err){
      console.log(err)
      alert(err)
      window.location.href ='/index.html'
    }
    else console.log('Joined chat room without any error')
  })
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
  scrollToBottom()
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

socket.on('updateUserList',(users)=>{
  console.log('users', users)
  const ol = jQuery('<ol></ol>')
  users.forEach(element => {
    let li = jQuery('<li></li>')
    li.text(element)
    ol.append(li)
  })

  jQuery('#users').html(ol)
  
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
  scrollToBottom()
})

socket.on('disconnect', () => {
  console.log('Server disconnected')
})
