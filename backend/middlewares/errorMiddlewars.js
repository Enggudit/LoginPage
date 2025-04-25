class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const login = (req, res, next) =>{}

export const errorMiddleware = (err, req, res, next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.code === 11000){
        err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err.statusCode = 400;
        err = new ErrorHandler(err.message, err.statusCode);
    }
    if(err.name === "JsonWebTokenError"){
        err.message = "Json Web Token is invalid, try again";
        err.statusCode = 400;
        err = new ErrorHandler(err.message, err.statusCode);
    }
    if(err.name === "TokenExpiredError"){
        err.message = "Json Web Token is expired, try again";
        err.statusCode = 400;
        err = new ErrorHandler(err.message, err.statusCode);
    }
    if(err.name === "CastError"){
        err.message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
        err = new ErrorHandler(err.message, err.statusCode);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map(value => value.message) : [err.message];

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,    });
};

export default ErrorHandler;