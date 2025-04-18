class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Indicate that this is an operational error
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;
