import ErrorHandler from "../middlewares/errorMiddlewars.js";
import {User} from "../models/userModels.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import exp from "constants";
import { Click_on_the_link_to_reset_your_password } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name,Fathername, DOB, email, password } = req.body;
        if (!name || !email || !password || !Fathername || !DOB) {
            return next(new ErrorHandler("Please enter all fields", 400));
        }
        // Check if the DOB is valid and not more than 200 years old
        
        const dob = new Date(DOB);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (age > 200 || dob > today) {
            return next(new ErrorHandler("Invalid date of birth. It must be a valid date and not more than 200 years old", 400));
        }
        
        const isRegistered = await User.findOne({ email, accountVerified: true });
        if (isRegistered) {
            return next(new ErrorHandler("User already registered", 400));
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.accountVerified === false) {
            return next(new ErrorHandler("User already registered, please verify your email", 400));
        }
        
        if (password.length < 6) {
            return next(new ErrorHandler("Password must be at least 6 characters", 400));
        }
        
        
        const hashedPassword = await bcrypt.hash(password, 10); // changed cost factor from 50 to 10
        const user = await User.create({
            name,
            Fathername,
            DOB,
            email,
            password: hashedPassword,

        });
        const verificationCode = await user.generateVerficationCode(); // typo fixed
        await user.save();
        sendVerificationCode(verificationCode, email, res);   // typo fixed
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    
    try {
        const userAllEntries = await User.find({
            email,
            accountVerified: false,
        }).sort({ createdAt: -1 });
        
        if (!userAllEntries || userAllEntries.length === 0) {
            return next(new ErrorHandler("User not found", 404));
        }
        let user;
        
        if (userAllEntries.length > 1) {
            user = userAllEntries[0];
        

            await User.deleteMany({
                _id: { $ne: user._id },
                email,
                accountVerified: false,
            });
        }else{
            user = userAllEntries[0];
        }
      
        if (user.verficationCode !== Number(otp)) {
            return next(new ErrorHandler("Invalid OTP", 400));
        }

        const currentTime = Date.now();
        const verificationCodeExpire = new Date(user.verficationCodeExpires).getTime();

        if (currentTime > verificationCodeExpire) {
            return next(new ErrorHandler("OTP expired", 400));
        }

        user.accountVerified = true;
        user.verficationCode = null;
        user.verficationCodeExpires = null;

        await user.save({ validateModifiedOnly: true });

        sendToken(user, 200, "Account verified successfully", res);
        
    } catch (err) {
        console.error("OTP verification error:", err);
        return next(new ErrorHandler("Internal Server Error", 500));
    }
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const user = await User.findOne({email, accountVerified: true}).select("+password");
    if(!user){
        return next(new ErrorHandler("User/password not found", 404));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid password/user", 400));
    }
    sendToken(user, 200, "Login successfully", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    
    res.status(200).cookie("token", "",{
        expires: new Date(Date.now()),
        httpOnly: true,
        

    }).json({
        sucess: true,
        message: "Logout successfully",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        sucess: true,
        user,
    });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    if(!req.body.email){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const user = await User.findOne({
        email: req.body.email,
        accountVerified: true,
    });
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = Click_on_the_link_to_reset_your_password(resetPasswordUrl);

    try{
        await sendEmail({
            email: user.email,
            subject: "Password Recovery System",
            message,
        });
        res.status(200).json({
            sucess: true,
            message: `Email sent to ${user.email}`,
        });
    }catch(error){
        console.log(error)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));

    }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.params;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    if(!req.body.password || !req.body.confirmPassword){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has expired", 400));
    }
    if(req.body.password !== req.body.confirmPassword ){
        return next(new ErrorHandler("Password and Confirm Password do not match", 400));          
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword)
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    sendToken(user, 200, "Password reset successfully", res);
});
  
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");
    const {currentPassword, newPassword, confirmnewPassword} = req.body;
    console.log(currentPassword, newPassword, confirmnewPassword)
    if(!currentPassword || !newPassword || !confirmnewPassword){
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Current password is incorrect", 400));
    }
    if(newPassword !== confirmnewPassword){
        return next(new ErrorHandler("New password does not match", 400));
    }  

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
        sucess: true,
        message: "Password updated successfully",
    });
});


