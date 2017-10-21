const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dk2emvx3d', 
    api_key: '857486931568465', 
    api_secret: 'mmAh7K10zRYI12Q-NX9L43ZtYG0' 
});

/* db */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
app.set('database', (process.env.MONGODB_URI || 'mongodb://admin:qwerty123__@ds123725.mlab.com:23725/testdb3432'));
mongoose.connect(app.get('database'))
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
var Image = require('./models/image')

const image = require('./routes/image');
app.use('/api/v1', image)

app.post('/upload', multipartMiddleware, function(req, res) {
  //console.log(req.files.im1.path);
  cloudinary.uploader.upload(req.files.im1.path, function(result) {
    var image = new Image ({ image: result.url})
    image.save()
    .then(result => res.json(result))
    .catch(e => next(e));
 })
})



const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Server listening on:', port)
});