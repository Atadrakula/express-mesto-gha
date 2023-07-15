class BadRequestError extends Error {
  constructor(message = 'Переданы некорректные данные на сервер') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
