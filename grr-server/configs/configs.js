const myIceConfigs = {
  ident: "DtheSecond",
  domain: "https://global.xirsys.net",
  application: "MyFirstApp",
  secret: "9e26fdd4-c74d-11e8-9db6-b48c6ca74e35",
  secure: 1,
  application: "default",
  room: "default",
  host: "global.xirsys.net",
  path: "/_turn/MyFirstApp",
  request: {
    method: "PUT",
    url: 'https://global.xirsys.net/_turn/MyFirstApp',
    headers: {
      "Authorization": "Basic " + new Buffer("DtheSecond:9e26fdd4-c74d-11e8-9db6-b48c6ca74e35").toString("base64")
    }
  },
  ice: {
    host: "global.xirsys.net",
    path: "/_turn/MyFirstApp",
    method: "PUT",
    headers: {
        "Authorization": "Basic " + new Buffer("DtheSecond:9e26fdd4-c74d-11e8-9db6-b48c6ca74e35").toString("base64")
    }
  },
  https: {
    cert: '/etc/letsencrypt/live/daad.ciciliostudio.com/fullchain.pem',
    key: '/etc/letsencrypt/live/daad.ciciliostudio.com/privkey.pem'    
  },
  headers: {
      "Authorization": "Basic " + new Buffer("DtheSecond:9e26fdd4-c74d-11e8-9db6-b48c6ca74e35").toString("base64")
  }
}

module.exports = myIceConfigs;