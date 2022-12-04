var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    publication_id: {type: Schema.Types.ObjectId, required: true},
    user_id: {type: Schema.Types.ObjectId, required: true},
    user: { type: String, required: true }, 
    comment: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
  );

module.exports = mongoose.model('comments', CommentSchema);