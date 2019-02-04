var Upload = require('../models/upload.model.js');
var  firebase  = require('../../firebase')
var upload = require('../../storage')
var fs = require('fs')
var mv = require('mv')
var getSize = require('image-size');


exports.create = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) { 
            console.log('Received authenticated file upload request')
            upload(req, res, (err) => {
                if (err) {
                    res.status(500).send({message: "Some error occurred while uploading upload."});
                }
            
                //Move the file to 
                //console.log(req.files[0])
                let path = './uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/'
                let source = './uploads/' + req.files[0].filename
                let destination = path + req.files[0].filename
                mv(source, destination, {mkdirp: true}, function(err) {
                    if (err) {
                        res.status(500).send({message: "Some error occurred while copying upload"});
                    }
                    getSize(path + req.files[0].filename, function (err, size) {
                        if (err) {
                            res.status(500).send({message: "Some error occured getting image size"})
                        }

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
                            if (err) {
                                res.status(500).send({message: "Some error occured saving upload model"})
                            }
                            console.log('Upload saved')
                            res.status(200).send({message: "File successfully uploaded"});  
                        })
                      });
                });
            })
        }        
    })
};


exports.findAll = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) { 
            Upload.find({'owner': email}, function(err, uploads){
                if(err){
                    console.log(err)
                    return res.status(500).send({message: "Some error occurred while retrieving uploads."});
                }
                else if(!uploads) {
                    return res.status(404)
                }
                else {
                    return res.send(uploads);
                }
            });
        }
    })
};

exports.findOne = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) { 
            Upload.findOne({'_id': req.params.id}, function(err, upload) {
                if(err) {
                    console.log(err);
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({message: "Upload not found with id " + req.params.id});
                    }
                    return res.status(500).send({message: "Error retrieving upload with id " + req.params.id});
                }

                if(!upload) {
                    return res.status(404).send({message: "Upload not found with id " + req.params.id});
                }

                if(upload.owner != email) {
                    return res.status(500).send({message: "Error retrieving upload with id " + req.params.id});
                }

                

                return res.send(upload)
            });
        }
    })
};


exports.delete = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) { 
            console.log("Recieved authenticated uploads delete by user: " + email);
            Upload.findOneAndDelete({'owner': email, '_id': req.params.id}, function(err, upload){
                if(err){
                    console.log(err)
                    return res.status(500).send({message: "Some error occurred while deleting upload."});
                }
                else if(!upload) {
                    return res.status(404).send({message: "No upload found matching id and owner."});
                }
                var path = './uploads/' + upload.fullpath
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            return res.status(500).send({message: "Some error occurred while deleting upload."});
                        }
                        return res.status(200).send({message: "Upload deleted"});
                      });
                }
            });
        }
    })
};

exports.getFile = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) {
            //TODO potential file escaping
            let path = './uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/' + req.params.filename
            if (fs.existsSync(path)) {
                console.log('Converting and sending image')
                var bitmap = fs.readFileSync(path);
                var data = new Buffer(bitmap).toString('base64');
                return res.send(data)
            } 
            return res.status(404).send({message: "File not found"})
        }
        return res.status(500).send({message: "Some error occurred while finding upload."});
    })
}
