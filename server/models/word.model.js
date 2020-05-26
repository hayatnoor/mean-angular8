const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Word', WordSchema);
