var Upload = require('../models/upload.model.js');
<<<<<<< HEAD
var uploadUtils = require('../utils/uploadUtils');
var firebase  = require('../../firebase')
=======
var Interview = require('../models/interview.model.js')
var  firebase  = require('../../firebase')
>>>>>>> interaction
var upload = require('../../storage')
var fs = require('fs')
var mv = require('mv')
var getSize = require('image-size');
var utils = require('../utils')
var errors = require('../utils/errors')


exports.create = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        console.log('Received authenticated file upload request')
        upload(req, res, (err) => {
            if (err) { throw errors.uploadError()}
        
            //Move the file to 
            //console.log(req.files[0])
            let path = './uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/'
            let source = './uploads/' + req.files[0].filename
            let destination = path + req.files[0].filename
            mv(source, destination, {mkdirp: true}, function(err) {
                if (err) { return utils.handleErrors(errors.uploadError(), res) }
                getSize(path + req.files[0].filename, function (err, size) {
                    if (err) { return utils.handleErrors(errors.uploadError(), res) }

                    var upload = new Upload({
                        name: req.files[0].filename,
                        uploadedOnDate: Date.now(),
                        owner: email,   
                        type: req.headers.type,
                        filetype: req.files[0].mimetype,
                        fullpath: ('/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/' + req.files[0].filename),
                        height: size.height,
                        width: size.width
                    })

                    upload.save(function(err, data) {
                        if (err) { return utils.handleMongoErrors(err, res) }
                        console.log('Upload saved')
                        res.status(200).send({message: "File successfully uploaded"});  
                    })
                });
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
                uploadUtils.filterUploads(uploads, (modified, filteredUploads) => {
                    res.send(filteredUploads);
                });
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
        Upload.findOne({'_id': req.params.id}, function(err, upload) {
            if (err) { return utils.handleMongoErrors(err, res) }
            if(!upload) {
                return res.status(404).send({message: "Upload not found with id " + req.params.id});
            }
            if(upload.owner != email) {
                return res.status(500).send({message: "Error retrieving upload with id " + req.params.id});
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
                var path = './uploads/' + upload.fullpath
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
    utils.authenticateRequest(req)
    .then((email) => {
        //TODO potential file escaping
        let path = './uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/' + req.params.filename
        if (fs.existsSync(path)) {
            console.log('Converting and sending image')
            return fs.readFile(path, function(err, data) {
                if(err) {return utils.handleErrors(errors.uploadError(), res)}
                return res.send(Buffer.from(data).toString('base64'))
            });
            
        } 
        utils.handleErrors(errors.uploadError(), res)
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })
}
