var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
    class_id: {type: Schema.Types.ObjectId, required: true },
    title: {type: String, required: true, max: 200},
    description: { type: String, required: true },
    content: { type: String, required: true},
    image: { type: String },
    published: { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
  }
  );

module.exports = mongoose.model('lessons', LessonSchema);