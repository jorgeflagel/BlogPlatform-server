const mongoose = require('mongoose');
const Article = require('../models/article');

const getArticle = async (req, res, next) => {
    try {
        const article = await Article.findOne({_id: req.params.articleId}).populate('author', {password: 0, email: 0});
        if(article) {
            res.status(200).json(article);
        }
        res.status(404).json({message: 'The article does not exist'});
    }
    catch (err) {
        next(err);   
    }
}

const getArticles = async (req, res, next) => {
    try {
        const articles = await Article.find(req.query, {text: 0}).populate('author', {password: 0, email: 0}).sort({updatedAt: -1});
        res.status(200).json(articles);        
    }
    catch (err) {
        next(err)
    }
}

const addArticle = async (req, res, next) => {
    const article = Article(req.body);
    article.author = req.user.id;
    try{
        const articleAdded = await article.save();
        res.status(200).json(articleAdded);
    }
    catch(err) {
        next(err);
    }
}

const updateArticle = async (req, res, next) => {
    try {
        const document = await Article.findOne({_id: req.body._id, author: req.user.id})
        if(!document) {
            res.status(404).json({message: 'The document you are trying to update does not exist'})
        }
        document.title = req.body.title
        document.text = req.body.text
        document.resume = req.body.resume
        const articleSaved = await document.save();
        if (articleSaved) {
            res.status(200).json(articleSaved);
        }
        res.status(200).json({message: 'An error has ocurred'});
    }
    catch(err) {
        next(err);
    }
}

const removeArticle = async (req, res, next) => {
    try {
        const articleId = req.params.articleId;
        const removedArticle = await Article.findOneAndDelete({_id: articleId, author: req.user.id});
        console.log(removedArticle);
        if(removedArticle) {
            res.status(200).json(removedArticle);
        }
        else {
            res.status(404).json({message: 'The article you are trying to remove does not exist'})
        }
    }
    catch(err) {
        next(err);
    }
}

module.exports = { getArticle, getArticles, addArticle, updateArticle, removeArticle };