const express = require('express');
const articlesRouter = express.Router();
const { verifyUser, verifyAdmin } = require('../controllers/authenticate');
const { getArticle, getArticles, addArticle, updateArticle, removeArticle } = require('../controllers/articles');


articlesRouter.route('/')
.get(getArticles)
.post((req, res, next) => {
    res.end('This method is not supported');
})
.put((req, res, next) => {
    res.end('This method is not supported');
})
.delete(verifyUser, verifyAdmin, (req, res, next) => {
    res.end('You are deleting all the articles')
});

articlesRouter.route('/newarticle')
.post(verifyUser, addArticle)

articlesRouter.route('/:articleId')
.get(getArticle)
.post((req, res, next) => {
    res.end('This method is not supported');
})
.put(verifyUser, updateArticle)
.delete(verifyUser, removeArticle)  

module.exports = articlesRouter;