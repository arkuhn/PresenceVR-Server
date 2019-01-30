var Upload = require('../models/upload.model.js');
var  firebase  = require('../../firebase')
var upload = require('../../storage')
var fs = require('fs')
var mv = require('mv')

const moveFile = (req, res, email) => {
    let path = './uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/'
    let source = './uploads/' + req.files[0].filename
    let destination = path + req.files[0].filename
    mv(source, destination, {mkdirp: true}, function(err) {
        if (err) {
            res.status(500).send({message: "Some error occurred while copying upload"});
        }
    });
}

exports.create = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) { 
            console.log('Received authenticated file upload request')
            upload(req, res, (err) => {
                console.log(req)
                if (err) {
                    res.status(500).send({message: "Some error occurred while uploading upload."});
                }
            
                //Move the file to 
                console.log(req.files[0])
                moveFile(req, res, email)

                var upload = new Upload({
                    name: req.files[0].filename,
                    uploadedOnDate: Date.now(),
                    owner: email,   
                    type: req.headers.type,
                    filetype: req.files[0].mimetype
                })

                upload.save(function(err, data) {
                    if (err) {
                        res.status(500).send({message: "Some error occured saving upload model"})
                    }
                    console.log('Upload saved')
                })

                res.status(200).send({message: "File successfully uploaded"});                    

            });
        }
    })
}


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
}


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
                else {
                    return res.send(upload);
                }
            });
        }
    })
}