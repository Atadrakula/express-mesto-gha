const { getAllUsers, getUserId, createNewUser } = require('../controllers/users');

const router = require('express').Router();


router.get('/users', getAllUsers);
router.get('/users/:userId', getUserId);
router.post('/users', createNewUser);

