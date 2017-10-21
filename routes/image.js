var express = require('express');
const router = express.Router();

var imageController = require('../controllers/image')

router.get('/images', imageController.allImages);

module.exports = router;