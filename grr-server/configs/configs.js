const myIceConfigs = {
  ident: "lance13c",
  domain: "https://global.xirsys.net",
  application: "MyFirstApp",
  secret: "6a6903b0-a7b5-11e7-ac9b-1bba796619b2",
  secure: 1,
  application: "default",
  room: "default",
  host: "global.xirsys.net",
  path: "/_turn/MyFirstApp",
  request: {
    method: "PUT",
    url: 'https://global.xirsys.net/_turn/MyFirstApp',
    headers: {
      "Authorization": "Basic " + new Buffer("lance13c:6a6903b0-a7b5-11e7-ac9b-1bba796619b2").toString("base64")
    }
  },
  ice: {
    host: "global.xirsys.net",
    path: "/_turn/MyFirstApp",
    method: "PUT",
    headers: {
        "Authorization": "Basic " + new Buffer("lance13c:6a6903b0-a7b5-11e7-ac9b-1bba796619b2").toString("base64")
    }
  },
  https: {
    cert: '/etc/letsencrypt/live/daad.ciciliostudio.com/fullchain.pem',
    key: '/etc/letsencrypt/live/daad.ciciliostudio.com/privkey.pem'    
  },
  headers: {
      "Authorization": "Basic " + new Buffer("lance13c:6a6903b0-a7b5-11e7-ac9b-1bba796619b2").toString("base64")
  }
}

module.exports = myIceConfigs;