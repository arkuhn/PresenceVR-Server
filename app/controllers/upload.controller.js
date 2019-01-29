var Asset = require('../models/asset.model.js');
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
            res.status(500).send({message: "Some error occurred while copying asset"});
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
                    res.status(500).send({message: "Some error occurred while uploading asset."});
                }
            
                //Move the file to 
                console.log(req.files[0])
                moveFile(req, res, email)

                var asset = new Asset({
                    name: req.files[0].filename,
                    uploadedOnDate: Date.now(),
                    owner: email,   
                    type: req.files[0].mimetype
                })

                asset.save(function(err, data) {
                    if (err) {
                        res.status(500).send({message: "Some error occured saving asset model"})
                    }
                    console.log('Asset saved')
                })

                res.status(200).send({message: "File successfully uploaded"});                    

            });
        }
    })
}


