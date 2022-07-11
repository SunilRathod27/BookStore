const express = require('express');
const { Books } = require('../_helpers/db');
const router = express.Router();
const booksService = require('./books.service');

// routes
router.post('/add', createBook);
router.post('/AllBooks', getAllBooks);
router.post('/getBookByAuthor', getBookByAuthor);
router.put('/update/:id', update);
router.delete('/deleteBook/:id', _delete);

module.exports = router;



function createBook(req, res, next) {

    booksService.createBook(req.body)
        .then(() => res.json({ msg: "book added success !!" }))
        .catch(err => next(err));
}


function getAllBooks(req, res, next) {

    booksService.getAllBooks(req.body)
        .then(books => res.json(books))
        .catch(err => next(err));
}

function getBookByAuthor(req, res, next) {

    booksService.getBookByAuthor(req.body)
        .then(book => book ? res.json(book) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    booksService.update(req.params.id, req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    booksService.delete(req.params.id)
        .then((data) => {
            if (data != null) {
                res.json({ msg: `${data.book_name} deleted success` })
            } else {
                res.json({ msg: `something went wrong` })
            }
        })
        .catch(err => next(err));
}


