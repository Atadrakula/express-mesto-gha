const { Joi, Segments, celebrate } = require('celebrate');
const { urlPattern } = require('../utils/regex');

const withCelebrate = (schema) => celebrate(schema);

const celebrateUserLoginSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const celebrateUserRegisterSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const celebrateUserGetUserIdSchema = withCelebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});

const celebrateUserUpdateProfileSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const celebrateUserUpdateAvatarSchema = withCelebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern),
  }),
});

module.exports = {
  celebrateUserRegisterSchema,
  celebrateUserLoginSchema,
  celebrateUserGetUserIdSchema,
  celebrateUserUpdateProfileSchema,
  celebrateUserUpdateAvatarSchema,
};
