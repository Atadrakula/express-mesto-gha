const router = require('express').Router();
const {
  getAllUsers, getUserId, updateUserProfile, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { celebrateUserGetUserIdSchema, celebrateUserUpdateProfileSchema, celebrateUserUpdateAvatarSchema } = require('../middlewares/celebrateUser');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrateUserGetUserIdSchema, getUserId);
router.patch('/me', celebrateUserUpdateProfileSchema, updateUserProfile);
router.patch('/me/avatar', celebrateUserUpdateAvatarSchema, updateUserAvatar);

module.exports = router;
