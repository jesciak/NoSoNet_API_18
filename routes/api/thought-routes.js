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

// route api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

//route api/thought/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// route api :thoughtId/reactions/
router.route('/:thoughtId/reactions/')
.post(addReaction)

// route api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports= router;