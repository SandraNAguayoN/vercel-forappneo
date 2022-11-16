var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    lastname: {type: String, required: true, max: 200},
    birthdate: { type: Date, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true},
    image: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
  }
  );

module.exports = mongoose.model('users', UserSchema);