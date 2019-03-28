const registerEventHandlers = (io) => {
    io.on('connection', function (client) {
        console.log("Socket Connection Established with ID :"+ client.id)


      
        client.on('join', (e) => {
          console.log(e)
          client.join('123')
        })
      

      
        client.on('disconnect', function () {
          console.log('client disconnect...', client.id)
        })
      
        client.on('error', function (err) {
          console.log('received error from client:', client.id)
          console.log(err)
        })
      })
}

module.exports = {registerEventHandlers}