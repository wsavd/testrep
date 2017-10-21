const express = require('express');
const app = express();
/*
const cors = require('cors');
app.use(cors());
*/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dk2emvx3d', 
    api_key: '857486931568465', 
    api_secret: 'mmAh7K10zRYI12Q-NX9L43ZtYG0' 
});

app.post('/upload', multipartMiddleware, function(req, res) {
  //console.log(req.files.im1.path);
  cloudinary.uploader.upload(req.files.im1.path, function(result) {
    console.log(result)
 })
})



const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Server listening on:', port)
});