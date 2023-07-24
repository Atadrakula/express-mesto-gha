class ConflictError extends Error {
  constructor(message = 'Дублирование данных не допустимо') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
