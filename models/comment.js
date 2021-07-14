const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    article:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
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

module.exports = mongoose.model('Comment', CommentSchema);