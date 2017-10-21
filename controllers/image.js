var Image = require('../models/image');

exports.allImages = function(req, res) {
  Image.find()
    .then(results => res.json(results)) 
    .catch(e => next(e));
}