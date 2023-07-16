const ServerError = require('../errors/serverError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const User = require('../models/user');

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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
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
};
