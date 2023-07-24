const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ServerError = require('../errors/serverError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(() => {
      next(new ServerError());
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'AuthenticationError') {
        next(new UnauthorizedError());
      } else {
        next(new ServerError());
      }
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new ServerError()));
};

const getUserId = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Пользователь с указанным userId: ${userId} не найден`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректный формат userId: ${userId}`));
      } else {
        next(new ServerError());
      }
    });
};

const createNewUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(new ServerError());
      }
    });
};

const updateUserProfile = (req, res, next) => {
  const { ...props } = req.body;

  User.findByIdAndUpdate(req.user._id, { ...props }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'StrictModeError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError(`Пользователь с указанным ${req.user._id} не найден`));
      } else {
        next(new ServerError());
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!avatar) {
    return next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
  }
  return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'StrictModeError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError(`Пользователь с указанным ${req.user._id} не найден`));
      } else {
        next(new ServerError());
      }
    });
};

module.exports = {
  getAllUsers,
  getUserId,
  createNewUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUser,
};
