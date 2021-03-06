var online = {}


const registerEventHandlers = (io) => {
    io.on('connection', function (client) {
        console.log("Socket Connection Established with ID :"+ client.id)


        client.on('join', (data) => {
          client.room = data.id
          client.user = data.user
          online[data.user] === 1
          console.log(data)
          client.join(data.id)
          io.to(data.id).emit('join', {user: data.user})
        })
        
        client.on('message', (data) => {
          console.log(data)
          io.to(data.id).emit('message', data)
        })

        client.on('getOnlineUsers', (data) => {
          console.log(data)
        })

        client.on('disconnect', function () {
          console.log('client disconnect...', client.id)
          online[client.user] === 0
          io.to(client.room).emit('leave', {user: client.user})
        })

        client.on('leave', function () {
            console.log('client leave room...', client.id)
            online[client.user] === 0
            client.leave(client.room)
            io.to(client.room).emit('leave', {user: client.user})
        })

        client.on('update', function() {
          console.log('client update')
          io.to(client.room).emit('updateInterview')
        })
      
        client.on('error', function (err) {
          console.log('received error from client:', client.id)
          console.log(err)
        })

        client.on('Marco', (data) => {
          io.to(data.id).emit('Marco', data);
        })

        client.on('Polo', (data) => {
          io.to(data.id).emit('Polo', data);
        })
      })
}

module.exports = {registerEventHandlers}