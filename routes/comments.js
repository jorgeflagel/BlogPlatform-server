const express = require('express');
const commentsRouter = express.Router();
const { verifyUser, verifyAdmin } = require('../controllers/authenticate');
const { getComment, getComments, addComment, updateComment, removeComment } = require('../controllers/comments');


commentsRouter.route('/byarticle/:articleId')
.get(getComments)
.post((req, res, next) => {
    res.end('This method is not supported');
})
.put((req, res, next) => {
    res.end('This method is not supported');
})
.delete(verifyUser, verifyAdmin, (req, res, next) => {
    res.end('You are deleting all the articles')
});

commentsRouter.route('/byarticle/:articleId/newcomment')
.post(verifyUser, addComment)

commentsRouter.route('/:commentId')
.get(getComment)
.post((req, res, next) => {
    res.end('This method is not supported');
})
.put(verifyUser, updateComment)
.delete(verifyUser, removeComment)  

module.exports = commentsRouter;