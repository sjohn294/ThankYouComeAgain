const router = require('express').Router();
const {getThoughts, createThought, updateThought, getSingleThought, deleteThought, addReaction, deleteReaction}= require('../../controllers/thoughtcontroller');
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)










module.exports = router;