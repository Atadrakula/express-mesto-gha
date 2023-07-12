const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере при получении данных обо всех пользователях' }));
};

const getUserId = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере при получении ID юзера' }));
};

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере при создании нового пользователя' }));
}


module.exports = {
  getAllUsers,
  getUserId,
  createNewUser
}

