const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка на сервере при получении данных о всех карточках', error: err.message }));
};


const createNewCard = (req, res) => {
  const { name, link } = req.body;

  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка на сервере при создании новой карточки', error: err.message }));
}


const deleteIdCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка на сервере при создании новой карточки', error: err.message }));

}

module.exports = {
  getAllCards,
  createNewCard,
  deleteIdCard,
}
