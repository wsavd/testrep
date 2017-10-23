const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var cloudinary = require('cloudinary')

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

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const image = require('./routes/image');
app.use('/api/v1', image)

app.get('/upload', multipartMiddleware, function(req, res) {
  Image.find({number: req.query.number}, {$exists: true}, function(err, result) {
    if(result.length > 0) {
      console.log("запись есть")
    } else {
      console.log("пишем в базу")
    }
  })
})
  //если от клиента не пусто
  /*
  if(req.files.im1) {
    var path = req.files.im1;
        //пикчу в облако
        cloudinary.uploader.upload(path.path, function(result) {
            var image = new Image ({ 
              image: result.url,
              question: req.body.question,
              answer: req.body.answer
            })
            image.save()
            .then(result => res.json(result))
            .catch(e => next(e));
        })
      } else {//иначе записать данные без нее
        var image = new Image ({ 
          question: req.body.question,
          answer: req.body.answer
        })
        image.save()
        .then(result => res.json(result))
        .catch(e => next(e));
      }*/
app.post('/href', multipartMiddleware, function(req, res) {
  //var href = req.body.href;
  //request
  console.log(req.files)
})
const port = process.env.PORT || 3008;
app.listen(port, function(){
    console.log('Server listening on:', port)
});