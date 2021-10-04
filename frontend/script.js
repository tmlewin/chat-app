const socket = io('http://localhost:8081')
const messageContainer = document.getElementById('chat-body')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Enter your name:')
socket.emit('new-user',name)

socket.on('chat-message',(data)=>{
    appendMessage(`${data.name}:${data.message}`)

})
socket.on('user-connected',(name)=>{
    appendMessage(`${name} connected`)

})
socket.on('user-disconnected',(name)=>{
    appendMessage(`${name} disconnected`)

})

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg = messageInput.value
    appendMessage(`You : ${msg}`)
    socket.emit('new-message',msg)
    messageInput.value = ''

})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}