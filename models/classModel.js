var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
    user: {type: String, required: true},
    username: { type: String, required: true},
    language: {type: String , required: true, max: 100},
    name: {type: String, required: true, max: 200},
    description: { type: String, required: true },
    image: { type: String },
    published: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
  }
  );

module.exports = mongoose.model('classes', ClassSchema);