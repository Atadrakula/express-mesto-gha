const router = require('express').Router();
const {
  getAllCards, createNewCard, deleteIdCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createNewCard);
router.delete('/:cardId', deleteIdCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
