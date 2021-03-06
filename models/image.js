var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const imageSchema = new Schema({
    image: {type: String },
    answer: {type: String},
    question: {type: String}
}, { versionKey: false });

module.exports = mongoose.model('Image', imageSchema);