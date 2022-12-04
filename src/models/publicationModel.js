var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
    user: {type: String, required: true},
    username: { type: String, required: true},
    name: {type: String, required: true, max: 200},
    description: { type: String, required: true, max: 500 },
    image: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
  }
  );

module.exports = mongoose.model('publications', PublicationSchema);