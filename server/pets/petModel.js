var mongoose = require('mongoose'),
    crypto   = require('crypto');

var petSchema = new mongoose.Schema({
 Age: Number,
 Breed: String
});

module.exports = mongoose.model('Pet', petSchema);
