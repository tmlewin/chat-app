const io = require('socket.io')(8081, {
    cors: {
      origin: "*",
    },
  });

const users= {};


io.on('connection',(socket)=>{
    console.log(`connected to sockets: ${socket.id}`);
    socket.on('new-user',(name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name)

    })
    socket.on('new-message',(message)=>{
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]})

    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id])
        users[socket.id]
        delete users[socket.id]

    })

})