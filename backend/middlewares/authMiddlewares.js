import { User } from "../models/userModels.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource", 400));
    }
    const decodedData = jwt.verify(token, process.env.JET_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});


export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }; 
};