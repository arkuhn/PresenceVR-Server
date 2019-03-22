const registerEventHandlers = (io) => {
    io.on('connection', function (client) {
        console.log("Socket Connection Established with ID :"+ client.id)

        client.on('register', handleRegister)
      
        client.on('join', handleJoin)
      
        client.on('leave', handleLeave)
      
        client.on('message', handleMessage)
      
        client.on('chatrooms', handleGetChatrooms)
      
        client.on('availableUsers', handleGetAvailableUsers)
      
        client.on('disconnect', function () {
          console.log('client disconnect...', client.id)
          handleDisconnect()
        })
      
        client.on('error', function (err) {
          console.log('received error from client:', client.id)
          console.log(err)
        })
      })
}

module.exports = {registerEventHandlers}