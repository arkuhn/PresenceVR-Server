var admin = require('firebase-admin');
var serviceAccount = require('./configs/serviceAccountKey.json');
var databaseURL = require('./configs/firebase').url;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL
});


const authenticateToken = (idToken) => {
    console.log('authenticating token')
    return admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            var uid = decodedToken.uid;
            return true;
            // ...
        }).catch(function(error) {
            // Handle error
            return false;
        });
}

module.exports = {
    authenticateToken
}