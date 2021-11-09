/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor({ message, status, isPublic }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
  }
}

module.exports = ExtendableError;
