const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // required: true
  },
  contactNumber: {
    type: String,
    // required: true
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('BusinessContact', businessContactSchema);