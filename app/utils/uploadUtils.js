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
                exists = false;
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

    let uploadIdList = [];          // Used to extract out only upload ids
    let isUploadObjects = false;    // Remember if the uploadList contained upload objects

    // If uploadList contains objects with _id, extract list of ids
    if(uploadList[0]._id) {
        isUploadObjects = true;
        for (var i = uploadList.length - 1; i >= 0; i--) {
            uploadIdList.push(uploadList[i]._id);
        }
    }

    // Otherwise, assume the uploadList is a list of ids
    else {
        uploadIdList = uploadList;
    }

    let filteredUploadIds = [];
    let modified = false;   // Track if we had to update anything and pass that on
    let curr = null;
    let callback_count = uploadIdList.length;    // Number of callbacks returned


    for (var i = uploadIdList.length - 1; i >= 0; i--) {
        curr = uploadIdList[i];

        // Remove if duplicate
        if(filteredUploadIds.includes(curr)) {
            console.log("\tRemoving duplicate Upload (" + curr + ") from list.");
            modified = true;
            continue;
        }

        // Check if Upload exists
        uploadUtils.validateUploadExists(curr, (exists, uploadId) => {
            if(exists) {
                console.log("\tKeeping Upload (" + uploadId + ") in list.");
                filteredUploadIds.push(uploadId);
            }
            else {
                console.log("\tRemoving bad Upload (" + uploadId + ") from list.");
                uploadUtils.cleanupBadUpload(uploadId);
                modified = true;
            }

            // Track that this callback has finished and check if it is the last one
            // TODO: Update to Promises to better handle failed async calls
            callback_count--;
            if(callback_count <= 0){

                // If we recieved upload objects, we must return objects
                if(isUploadObjects) {
                    let filteredUploads = [];
                    for (var i = uploadList.length - 1; i >= 0; i--) {
                        if(filteredUploadIds.contains(uploadList[i]._id)) {
                            filteredUploads.push(uploadList[i]);
                        }
                    }
                    callback(modified, filteredUploads);
                }

                // Otherwise just return the list
                else {
                    callback(modified, filteredUploadIds);
                }
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
                console.error("\tNo errors to report");
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
