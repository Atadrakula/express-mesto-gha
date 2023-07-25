const router = require('express').Router();
const { celebrate } = require('celebrate');
const { celebrateСreateNewCardSchema, celebrateCardIdSchema } = require('../middlewares/celebrateCard');
const {
  getAllCards, createNewCard, deleteIdCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', celebrate(celebrateСreateNewCardSchema), createNewCard);
router.delete('/:cardId', celebrate(celebrateCardIdSchema), deleteIdCard);
router.put('/:cardId/likes', celebrate(celebrateCardIdSchema), likeCard);
router.delete('/:cardId/likes', celebrate(celebrateCardIdSchema), dislikeCard);

module.exports = router;
