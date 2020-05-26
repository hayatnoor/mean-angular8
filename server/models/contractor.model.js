const mongoose = require('mongoose');

const ContractorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  job: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Contractor', ContractorSchema);
