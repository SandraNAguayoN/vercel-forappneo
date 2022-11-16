var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LanguageSchema = new Schema({
    name: {type: Schema.Types.ObjectId, required: true},
    image: {type: Schema.Types.ObjectId, required: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
  );

module.exports = mongoose.model('languages', LanguageSchema);