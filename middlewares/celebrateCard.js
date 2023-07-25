const { Joi, Segments } = require('celebrate');

const celebrateСreateNewCardSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().url().required(),
  }),
};

const celebrateCardIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
};

module.exports = {
  celebrateСreateNewCardSchema,
  celebrateCardIdSchema,
};
