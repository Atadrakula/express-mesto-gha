const { Joi, Segments } = require('celebrate');

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=])[A-Za-z\d!@#$%^&*()\-_+=]{8,}$/;

const celebrateUserLoginSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(strongPasswordRegex).required(),
  }),
};

const celebrateUserRegisterSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(strongPasswordRegex).required(),
  }),
};

const celebrateUserAuthSchema = {
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().pattern(/^Bearer .*/).required(),
  }).unknown(),
};

const celebrateUserGetUserIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
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
    avatar: Joi.string().uri(),
  }),
};

module.exports = {
  celebrateUserRegisterSchema,
  celebrateUserLoginSchema,
  celebrateUserAuthSchema,
  celebrateUserGetUserIdSchema,
  celebrateUserUpdateProfileSchema,
  celebrateUserUpdateAvatarSchema,
};
