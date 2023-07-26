const { Joi, Segments, celebrate } = require('celebrate');
const { urlPattern } = require('../utils/regex');

const withCelebrate = (schema) => celebrate(schema);

const celebrateСreateNewCardSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlPattern).required(),
  }),
});

const celebrateCardIdSchema = withCelebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  celebrateСreateNewCardSchema,
  celebrateCardIdSchema,
};
