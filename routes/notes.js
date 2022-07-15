const express = require('express');
const router = express.Router();

let notes = require('../notes');

// mongoose 
const Note = require('../models/notes');

// GET ALL NOTES
router.get('/', (req, res, next) => {
    // console.log(req.headers);
    // console.log(req.get('host'));
  
    Note.find({})
        .then(result => {
        res.json(result);
        })
        .catch(err => next(err))
})

// GET A SINGLE NOTE (if nonexistent, return 404)
router.get('/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note);
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            next(err);
        })
})
  
// CREATE A NOTE (do sanity checking, send 400 if bad request)
router.post('/', (req, res, next) => {
    // before mongoose validation
    // if (!req.body.content) {
    //     return res.status(400).json({'error': 'content missing'});
    // }

    const note = new Note({
        content: req.body.content,
        important: req.body.important || false,
        date: new Date()
    })

    note
        .save()
        .then(savedNote => res.json(savedNote))
        .catch(err => next(err))
})

// UPDATE A NOTE'S IMPORTANCE
router.put('/:id', (req, res, next) => {
    const note = {
        content: req.body.content,
        important: req.body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote);
        })
        .catch(err => next(err))
})
  
// DELETE A NOTE (send 204 for no content)
router.delete('/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(err => next(err))
})

module.exports = router;