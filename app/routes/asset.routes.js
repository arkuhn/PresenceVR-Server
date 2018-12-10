
module.exports = function(app) {

    var assets = require('../controllers/asset.controller.js');
 
    // Create a new asset
    app.post('/api/assets', assets.create);

    // Delete an asset
    app.delete('/api/assets/', assets.delete);

    // Retrieve all assets
    app.get('/api/assets/:host', assets.findAll);

    // Retrieve a single asset with assetId
    app.get('/api/asset/:id', assets.findOne);

}