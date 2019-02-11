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
            // Upload exists in database
            // Check if the file also exists
            let path = './uploads/' + upload.fullpath;
            if (!fs.existsSync(path)) {
                console.error("Upload (" + uploadId + ") file does not exist.");
                // TODO: Uncomment and validate call below
                //uploadUtils.cleanupBadUpload(uploadId);
                esists = false;
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
            console.log("\tRemoving duplicate Upload (" + curr + ").");
            modified = true;
            continue;
        }

        // Check if Upload exists
        uploadUtils.validateUploadExists(curr, (exists, uploadId) => {
            if(exists) {
                console.log("\tKeeping Upload (" + uploadId + ").");
                filteredUploads.push(uploadId);
            }
            else {
                console.log("\tRemoving bad Upload (" + uploadId + ").");
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


exports.cleanupBadUpload = function(uploadId, uploadPath=null) {

    // If uploadId is given, attempt to remove it from the database
    if(uploadId) {

        // Attempt to remove Upload Database Entry
        Upload.findOneAndDelete({'_id': uploadId}, function(err, upload) {

            // Handle Errors
            if(err) {
                console.error("Failed to remove bad upload (" + uploadId + ").");
                console.error(err);
            }
            else if(!upload) {
                console.error("Failed to remove bad upload (" + uploadId + ").");
                console.error("No errors to report");
            }

            // Otherwise report success
            else {
                console.log("Removed bad upload (" + upload._id + ") from database.");
            }

        });
    }

    // If uploadPath is given, attempt to remove the file from the server
    else if(uploadPath) {

        // Ensure File does exist
        if(!fs.existsSync(uploadPath)) {
            console.error("Upload cannot be cleaned up at (" + uploadPath + "): File not found.");
        }

        // Attempt to remove if it does
        else {
            fs.unlink(uploadPath, (err) => {

                // Handle errors
                if(err) {
                    console.error("Upload cannot be cleaned up at (" + uploadPath + "): Failed to unlink file.");
                }

                // Report success
                else {
                    console.log("Removed bad upload file (" + uploadPath + ").");
                }
            });
        }
    }

    // If neither uploadId nor uploadPath are given, log this and move on
    else {
        console.log("Ignoring empty cleanupBadUpload call.");
    }

    return
}
