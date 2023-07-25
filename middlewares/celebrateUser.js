const { Joi, Segments } = require('celebrate');
const { urlPattern } = require('../utils/regex');

const celebrateUserLoginSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

const celebrateUserRegisterSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

const celebrateUserGetUserIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
};

const celebrateUserUpdateProfileSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const celebrateUserUpdateAvatarSchema = {
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern),
  }),
};

module.exports = {
  celebrateUserRegisterSchema,
  celebrateUserLoginSchema,
  celebrateUserGetUserIdSchema,
  celebrateUserUpdateProfileSchema,
  celebrateUserUpdateAvatarSchema,
};
