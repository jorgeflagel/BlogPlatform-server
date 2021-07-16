const mongoose = require('mongoose');
const Comment = require('../models/comment');

const getComment = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({_id: req.params.commentId}).populate('author', {password: 0, email: 0});
        if(comment) {
            res.status(200).json(comment);
        }
        res.status(404).json({message: 'The comment does not exist'});
    }
    catch (err) {
        next(err);   
    }
}

const getComments = async (req, res, next) => {

    console.log("#########################")
    try {
        const comments = await Comment.find({article: req.params.articleId}).populate('author', {password: 0, email: 0}).sort({updatedAt: -1});
        res.status(200).json(comments);        
    }
    catch (err) {
        next(err);
    }
}

const addComment = async (req, res, next) => {
    const comment = Comment(req.body);
    comment.author = req.user.id;
    comment.article = req.params.articleId;
    try{
        const commentAdded = await comment.save();
        const commentPopulated = await commentAdded.populate('author', {password: 0, email: 0}).execPopulate();
        res.status(200).json(commentPopulated);
    }
    catch(err) {
        next(err);
    }
}

const updateComment = async (req, res, next) => {
    try {
        const document = await Comment.findOne({_id: req.body._id, author: req.user.id})
        if(!document) {
            res.status(404).json({message: 'The document you are trying to update does not exist'})
        }
        document.text = req.body.text
        const commentSaved = await document.save();
        if (commentSaved) {
            res.status(200).json(commentSaved);
        }
        res.status(200).json({message: 'An error has ocurred'});
    }
    catch(err) {
        next(err);
    }
}

const removeComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const removedComment = await Comment.findOneAndDelete({_id: commentId, author: req.user.id});
        if(removedComment) {
            console.log(removedComment);
            res.status(200).json(removedComment);
        }
        else {
            res.status(404).json({message: 'The comment you are trying to remove does not exist'})
        }
    }
    catch(err) {
        next(err);
    }
}

module.exports = { getComment, getComments, addComment,updateComment, removeComment };