const router = require('express').Router();
const { celebrateСreateNewCardSchema, celebrateCardIdSchema } = require('../middlewares/celebrateCard');
const {
  getAllCards, createNewCard, deleteIdCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', celebrateСreateNewCardSchema, createNewCard);
router.delete('/:cardId', celebrateCardIdSchema, deleteIdCard);
router.put('/:cardId/likes', celebrateCardIdSchema, likeCard);
router.delete('/:cardId/likes', celebrateCardIdSchema, dislikeCard);

module.exports = router;
