var Upload = require('../models/upload.model.js');
var uploadUtils = require('../utils/uploadUtils');
var firebase  = require('../../firebase')
var Interview = require('../models/interview.model.js')
var upload = require('../../storage')
var fs = require('fs')
var mv = require('mv')
var getSize = require('image-size');
var utils = require('../utils')
var errors = require('../utils/errors')
var path = require('path');

exports.create = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        console.log('Received authenticated file upload request')
        upload(req, res, (err) => {           
            if (err) { throw errors.uploadError()}       
            //Move the file to 
            //console.log(req.files[0])
            
            let source = './uploads/' + req.files[0].filename
            let destination = './storage/uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/' + req.files[0].filename
            mv(source, destination, {mkdirp: true}, function(err) {   
                console.error(err)             
                if (err) { return utils.handleErrors(errors.uploadError(), res) }

                if (req.files[0].mimetype.includes("png") || req.files[0].mimetype.includes("jpeg")){
                    getSize(destination, function (err, size) {
                        
                        if (err) { console.error(err) 
                            return utils.handleErrors(errors.uploadError(), res) 
                        }

                        var upload = new Upload({
                            name: req.files[0].filename,
                            uploadedOnDate: Date.now(),
                            owner: email,   
                            type: req.headers.type,
                            filetype: req.files[0].mimetype,
                            fullpath: destination,
                            height: size.height,
                            width: size.width
                        })

                        upload.save(function(err, data) {
                            if (err) { return utils.handleMongoErrors(err, res) }
                            console.log('Upload saved')
                            res.status(200).send({message: "File successfully uploaded"});  
                        })
                    });
                }
                else if (req.files[0].mimetype.includes("octet-stream")){
                    
                    if (err) { return utils.handleErrors(errors.uploadError(), res) }

                    var upload = new Upload({
                        name: req.files[0].filename,
                        uploadedOnDate: Date.now(),
                        owner: email,   
                        type: req.headers.type,
                        filetype: req.files[0].mimetype,
                        fullpath: destination
                    })

                    upload.save(function(err, data) {
                        if (err) { return utils.handleMongoErrors(err, res) }
                        console.log('Upload saved')
                        res.status(200).send({message: "File successfully uploaded"});  
                    })
                }
            });
        })
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })
};


exports.findAll = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        Upload.find({'owner': email}, function(err, uploads){
            if (err) { return utils.handleMongoErrors(err, res) }
            else if(!uploads) {
                return res.status(404)
            }
            else {
                res.send(uploads)
                //uploadUtils.filterUploads(uploads, (modified, filteredUploads) => {
                //    res.send(filteredUploads);
                //});
            }
        });
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })
};

exports.findOne = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        console.log('Finding upload with id: ', req.params.id)
        return Upload.findOne({'_id': req.params.id}, function(err, upload) {
            if (err) { return utils.handleMongoErrors(err, res) }
            if(!upload) {
                return res.status(404).send({message: "Upload not found with id " + req.params.id});
            }
            
            return res.send(upload)
        });
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })
};


exports.delete = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        console.log("Recieved authenticated uploads delete by user: " + email);
        var deleteUploadFromDB = Upload.findOneAndDelete({'owner': email, '_id': req.params.id}).exec()
        return deleteUploadFromDB
            .then((upload) => {
                if(!upload || upload.owner != email) {
                    return res.status(404).send({message: "No upload found matching id and owner."});
                }
                return Promise.all([Promise.resolve(upload), Interview.find({loadedAssets: upload._id}).exec()])
            })
            .then(([upload, interviewsWithUpload]) => {
                var unloadPromises = interviewsWithUpload.map((interview) => {
                    return Interview.findByIdAndUpdate(interview._id, interview.loadedAssets.splice(interview.loadedAssets.indexOf(upload._id, 1))).exec()
                })

                Promise.all(unloadPromises).then((interviews) => {
                    console.log(`Deleted Asset was unloaded from ${interviews.length} interviews`)
                })

                return upload
            })
            .then((upload) => {
                var path = upload.fullpath
                if (!fs.existsSync(path)) {
                    return res.status(404).send({message: `No upload found`});
                }
                fs.unlink(path, (err) => {
                    if (err) { return utils.handleErrors(errors.uploadError(), res) }
                    return res.status(200).send({message: "Upload deleted"});
                });
            })
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })
};

exports.getFile = function(req, res) {
    req.headers.authorization = req.params.token
    utils.authenticateRequest(req)
    .then((email) => {
        console.log(email)
        if (req.params.uid === email.replace(/[^a-zA-Z0-9]/g, '')){
            res.sendFile( path.resolve(__dirname + `/../../storage/uploads/${req.params.uid}/${req.params.filename}`))
        }
    })
   
}
