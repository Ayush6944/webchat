class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Only because we are extending a built in class
        // Object.setPrototypeOf(this, ErrorHandler.prototype);
    }

}

export {ErrorHandler};