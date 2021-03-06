var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var utils = require('../utils');
var errors = require('../utils/errors');
var config = require('../../configs');

exports.getToken = function (req, res) {

    utils.authenticateRequest(req)
        .then((email) => {
            var identity = email;

            // Create an access token which we will sign and return to the client,
            // containing the grant we just created
            var token = new AccessToken(
                config.twilioConfig.accountSid,
                config.twilioConfig.keySid,
                config.twilioConfig.apiSecret
            );

            // Assign the generated identity to the token
            token.identity = identity;

            const grant = new VideoGrant();
            // Grant token access to the Video API features
            token.addGrant(grant);

            // Serialize the token to a JWT string and include it in a JSON response
            res.send({
                identity: identity,
                token: token.toJwt()
            });
        }).catch((err) => {
            utils.handleErrors(err, res);
        });
}