const express = require('express');
const myUserRouter = express.Router();
const { verifyUser } = require('../controllers/authenticate');
const { getUserByToken, updateUserById, signup, login, uploadImageProfile } = require('../controllers/myuser');

/* GET users listing. */
myUserRouter.route('/')
.all(verifyUser)
.get(verifyUser, getUserByToken)
.put(verifyUser, uploadImageProfile, updateUserById)

myUserRouter.route('/signup')
.post(signup)

myUserRouter.route('/login')
.post(login)

module.exports = myUserRouter;