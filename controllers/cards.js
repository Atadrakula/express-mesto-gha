const ServerError = require('../errors/serverError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const Card = require('../models/card');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new ServerError()));
};

const createNewCard = (req, res, next) => {
  const { name, link } = req.body;

  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(new ServerError());
      }
    });
};

const deleteIdCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Карточка с указанным cardId: ${cardId} не найдена`));
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректный cardId: ${cardId} при удалении карточки`));
      } else {
        next(new ServerError());
      }
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с указанным ${cardId} не найдена`));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректный cardId: ${cardId} для постановки лайка карточки`));
      } else {
        next(new ServerError());
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(`Карточка с указанным ${cardId} не найдена`));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректный cardId: ${cardId} для постановки лайка карточки`));
      } else {
        next(new ServerError());
      }
    });
};

module.exports = {
  getAllCards,
  createNewCard,
  deleteIdCard,
  likeCard,
  dislikeCard,
};
