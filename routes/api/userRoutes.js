const router = require('express').Router();
const {getusers, createUser, getSingleUser, updateUser, deleteUser, addFriend, deleteFriend}= require('../../controllers/usercontroller');
router.route('/').get(getusers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);







module.exports= router