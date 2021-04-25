const express = require('express');
const usersRouter = express.Router();
const { getUsers, getUserByUsername, getUserByToken, updateUserById } = require('../controllers/users');

usersRouter.route('/')
.get(getUsers)

usersRouter.route('/:username')
.get(getUserByUsername)

module.exports = usersRouter;
