var express = require('express');
var authorsRouter = express.Router();

authorsRouter.route('/')
.get((req, res, next) => {
    res.end('You get the complete list of authors');
})
.post((req, res, next) => {
    res.end('This method is not supported');
})
.put((req, res, next) => {
    res.end('This method is not supported');
})
.delete((req, res, next) => {
    res.end('You are deleting all the authors')
})  

authorsRouter.route('/:authorId')
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

module.exports = authorsRouter;
  