var multer = require('multer')
var fs = require('fs')

const destination = './uploads/'
const filename = (req, file, cb) => cb(null, file.originalname + Date.now())

const allowedImagesExts = ['jpg', 'png', 'gif', 'jpeg']
const fileFilter =  (req, file, cb) => 
  cb(null, allowedImagesExts.includes(file.originalname.split('.').pop()))

const storage = multer.diskStorage({ destination, filename })
   
module.exports = multer({
    storage,
    limits:{fileSize: 1000000},
    fileFilter
}).single("assetUpload")