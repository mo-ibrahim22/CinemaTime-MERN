const cloudinary = require('cloudinary').v2;
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: "dwqweg889", 
        api_key: "856626764146698", 
        api_secret: "141xH3LAoLubMWCBKIuRjHZmja0" 
    });
    
     
})();

module.exports = cloudinary;