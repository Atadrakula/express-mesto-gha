const router = require('express').Router();
const {
  getAllUsers, getUserId, createNewUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserId);
router.post('/', createNewUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
