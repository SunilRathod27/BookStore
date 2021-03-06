const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/getusers', getAll);
router.get('/current', getCurrent);
router.post('/getById', getById);
router.put('/update/:id', update);
router.delete('/delete/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {

    userService.create(req.body)
        .then(() => res.json({ msg: "user created success" }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.body.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function _delete(req, res, next) {

    userService.delete(req.params.id)
        .then((data) => {
            if (data != null) {
                res.json({ msg: `${data.username} deleted success` })
            } else {
                res.json({ msg: `something went wrong` })
            }
        })
        .catch(err => next(err));
}