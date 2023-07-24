class ForbiddenError extends Error {
  constructor(message = 'Недостаточно прав для выполнения операции') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
