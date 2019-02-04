//database configs
const { databaseConfig } = require('../configs');
var mongoose = require('mongoose');
const Interview = require('../app/models/interview.model')
const Upload = require('../app/models/upload.model')
var fs = require('fs');

//database setup
mongoose.connect(databaseConfig.url, {});

var db = mongoose.connection;

db.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

db.once('open', function() {
    console.log("Successfully connected to the database");
});

/*
DATA
*/
var email = process.argv[2]
var names = ['Jan', 'Alice', 'Alex', 'Walker']
var descriptions = ['An art interview', 'an interview about programming', 'A portfolio display', 'A technical interview']
var times = ['1:00PM', '2:30PM', '12:00PM', '10:45AM']
var dates = ['4/23/19', '6/27/19', '3/21/19', '2/14/19']
var participants = ['jan@email.com', 'alice@email.com', 'alex@email.com', 'walker@email.com']
var uploads = ['waterlilies.png', 'vangough.png', 'wave.png', 'cotopaxi.png', 'icebound.png']
var sizes = [{width: 1280, height:838}, {width: 1280, height:789}, {width: 1280, height:868}, {width: 1280, height:789}, {width: 1280, height:789}]
const createInterviews = () => {
    for (i=0; i < 4; i ++) {
        var interview = new Interview({
            host: email,
            details: descriptions[i],
            occursOnDate: dates[i],
            occursAtTime: times[i],
            scheduledOnDate: new Date().toLocaleDateString("en-US"),
            participants: participants,
            loadedAssets: [],
            loadedEnvironment: 'default'
            
        });
        interview.save(function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log('Interview saved')
            }
        });
    }
}


const createUploads = () => {
    for (i=0; i < 4; i ++) {
        var upload = new Upload({
            name: uploads[i],
            uploadedOnDate: Date.now(),
            owner: email,   
            type: 'asset',
            filetype: 'image/png',
            fullpath: ('/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/' + uploads[i]),
            height: sizes[i].height,
            width: sizes[i].width
        })

        upload.save(function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log('Upload saved')
        })

        

        var source = './' + uploads[i]
        var dir = '../uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/'
        var dest = '../uploads/' + email.replace(/[^a-zA-Z0-9]/g, '') + '/' + uploads[i]

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(dest, fs.readFileSync(source));

    }
}

createInterviews()
createUploads()

