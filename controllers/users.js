const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка на сервере при получении данных обо всех пользователях', error: err.message }));
};

const getUserId = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка на сервере при получении ID юзера', error: err.message }));
};

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка на сервере при создании нового пользователя', error: err.message }));
}


module.exports = {
  getAllUsers,
  getUserId,
  createNewUser
}

