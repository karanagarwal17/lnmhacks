var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var freelancerSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  rating: {
    type: Number,
    required:true,
    min: 1,
    max: 5
  },
  rate: {
    type: Number,
    required:true
  },
  Location: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true
  }
});

var freelancer = mongoose.model('freelancer',freelancerSchema);

module.exports = freelancer;
