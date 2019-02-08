var Upload = require('../models/upload.model.js');
var uploadUtils = require('./uploadUtils');
var fs = require('fs');


exports.validateUploadExists = function(uploadId, callback) {
    let exists = null;

    // Use axios to check if it exists in the database
    Upload.findOne({'_id': uploadId}, function(err, upload) {

        exists = true;  

        if(err || !upload) {
            //No Upload found
            console.error("Upload (" + uploadId + ") does not exist in database.");
            exists = false;
        }
        else {
            // Upload exists in database -> Add to filtered array
            let path = './uploads/' + upload.fullpath;
            if (!fs.existsSync(path)) {
                console.error("Upload (" + uploadId + ") does not exist in database.");
                esists = false;
                // TODO: Resolve invalid database entry
            } 
        }

        callback(exists, uploadId);
    });
}


exports.filterUploads = function(uploadList, callback) {
    console.log("Filtering Uploads:");

    // Check if list is empty
    if(uploadList.length == 0) {
        console.log("\tNothing to be done.");
        callback(false, []);
    }

    let filteredUploads = [];
    let modified = false;   // Track if we had to update anything and pass that on
    let curr = null;
    let callback_count = uploadList.length;    // Number of callbacks returned


    for (var i = uploadList.length - 1; i >= 0; i--) {
        curr = uploadList[i];

        // Remove if duplicate
        if(filteredUploads.includes(curr)) {
            console.log("\tRemoving Upload (" + curr + ")");
            modified = true;
            continue;
        }

        // Check if Upload exists
        uploadUtils.validateUploadExists(curr, (exists, uploadId) => {
            if(exists) {
                console.log("\tKeeping Upload (" + uploadId + ")");
                filteredUploads.push(uploadId);
            }
            else {
                console.log("\tRemoving Upload (" + uploadId + ")");
                modified = true;
            }

            // Track that this callback has finished and check if it is the last one
            // TODO: Update to Promises to better handle failed async calls
            callback_count--;
            if(callback_count <= 0){
                callback(modified, filteredUploads);
            }
            return;
        });

        continue;
    }
}
