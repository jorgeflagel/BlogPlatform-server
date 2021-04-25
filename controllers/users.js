// loading model
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    data = await User.find({}, {password: 0, email: 0});
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

const getUserByUsername = async (req, res, next) => {
  try {
    data = await User.findOne({username: req.params.username}, {password: 0, email: 0});
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getUsers, getUserByUsername };