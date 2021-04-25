var express = require('express');
var followedRouter = express.Router();

followedRouter.route('/:authorId')
.get((req, res, next) => {
    res.end('You get the list of authors that you are following');
})
.post((req, res, next) => {
    res.end('This method is not supported');
})
.put((req, res, next) => {
    res.end('This method is not supported');
})
.delete((req, res, next) => {
    res.end('You are deleting all the autors that are following')
})  

followedRouter.route('/:authorId')
.get((req, res, next) => {
    res.end('You get the data of the author');
})
.post((req, res, next) => {
    res.end('You are adding a new author');
})
.put((req, res, next) => {
    res.end('You are updating the author');
})
.delete((req, res, next) => {
    res.end('You are deleting the author')
})  

module.exports = followedRouter;