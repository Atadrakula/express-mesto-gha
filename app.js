const express = require('express');
const mongoose = require('mongoose');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Пришел запрос: ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64b25aeb1eabbdcbb9d1cecf',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Произошла ошибка на сервере';

  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
