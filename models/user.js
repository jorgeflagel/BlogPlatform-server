const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20
      },
    email: {
      type: String,
      lowercase: true
      // validate: (value) => validator.isEmail(value),
      // required: true
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      max: 100,
      default: ''
    },
    resume: {
      type: String,
      max: 300,
      default: ''
    },
    admin: {
      type: Boolean,
      default: false
    },
    profileImageUrl: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);