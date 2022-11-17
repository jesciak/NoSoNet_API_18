const router= require('express').Router();
const{
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// route api/thougts
router.route('/')
.get(getThoughts)
.post(createThought);

//route api/thought/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// route api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.post(addReaction)
.delete(deleteReaction);

module.exports= router;