const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
        type: String,
        required: true
    },
    resume:{
      type: String,
      default: ' '
    },
    text: {
      type: String,
      required: true
      },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', ArticleSchema);