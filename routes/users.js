const { getAllUsers, getUserId, createNewUser } = require('../controllers/users');

const router = require('express').Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserId);
router.post('/', createNewUser);

module.exports = router;