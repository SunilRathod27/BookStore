const express = require('express');
const { Books } = require('../_helpers/db');
const router = express.Router();
const booksService = require('./books.service');

// routes
router.post('/add', createBook);
router.post('/AllBooks', getAllBooks);
router.get('/:author', getBookByAuthor);
router.put('/update/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function createBook(req,res,next) {
    
    booksService.createBook(req.body)
     .then(() => res.json({}))
    .catch(err => next(err));
}


function getAllBooks(req, res, next) {
    booksService.getAllBooks()
        .then(books => res.json(books))
        .catch(err => next(err));
}

function getBookByAuthor(req, res, next) {
    // console.log(req.body);
    booksService.getBookByAuthor(req.params.author_name)
        .then(book => book ? res.json(book) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    booksService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    booksService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


