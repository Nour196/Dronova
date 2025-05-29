// Utils/customError.js

/**
 * Custom error class for handling API errors with status codes
 */
class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  /**
   * Custom error for authentication failures
   */
  class AuthError extends AppError {
    constructor(message = 'Authentication failed') {
      super(message, 401);
    }
  }
  
  /**
   * Custom error for authorization failures
   */
  class ForbiddenError extends AppError {
    constructor(message = 'Access forbidden') {
      super(message, 403);
    }
  }
  
  /**
   * Custom error for resource not found
   */
  class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }
  
  module.exports = {
    CustomError: AppError,
    AppError,
    AuthError,
    ForbiddenError,
    NotFoundError
  };