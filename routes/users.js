const router = require('express').Router();
const celebrate = require('celebrate');
const {
  getAllUsers, getUserId, updateUserProfile, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { celebrateUserGetUserIdSchema, celebrateUserUpdateProfileSchema, celebrateUserUpdateAvatarSchema } = require('../middlewares/celebrateUser');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(celebrateUserGetUserIdSchema), getUserId);
router.patch('/me', celebrate(celebrateUserUpdateProfileSchema), updateUserProfile);
router.patch('/me/avatar', celebrate(celebrateUserUpdateAvatarSchema), updateUserAvatar);

module.exports = router;
