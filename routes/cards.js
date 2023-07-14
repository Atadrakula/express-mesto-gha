const { getAllCards, createNewCard, deleteIdCard } = require('../controllers/cards');

const router = require('express').Router();

router.get('/', getAllCards);
router.post('/', createNewCard);
router.delete('/:cardId', deleteIdCard);

module.exports = router;