var Upload = require('../models/upload.model.js');
var fs = require('fs');


function validateAssetExists(assetId, callback) {
    let exists = null;

    // Use axios to check if it exists in the database
    Upload.findOne({'_id': assetId}, function(err, upload) {

        exists = true;  

        if(err || !upload) {
            //No Asset found
            console.error("Asset (" + assetId + ") does not exist in database.");
            exists = false;
        }
        else {
            // Asset exists in database -> Add to filtered array
            let path = './uploads/' + upload.fullpath;
            if (!fs.existsSync(path)) {
                console.error("Asset (" + assetId + ") does not exist in database.");
                esists = false;
                // TODO: Resolve invalid database entry
            } 
        }

        callback(exists, assetId);
    });
}