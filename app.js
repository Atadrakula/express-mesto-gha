const express = require('express');
const mongoose = require('mongoose');



const { PORT=3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true
});


app.use((req, res, next) => {
  console.log(`Пришел запрос: ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64b17c01d988e86b759d85ed'
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

