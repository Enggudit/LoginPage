import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true,
    },
    Fathername: {
        type: String,
        required:true,
        trim: true,
    },
    DOB: {
        type: Date,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password: {
        type: String,
        required:true,
        select:false,
    },
    role: {
        type: String,
        
        default:"User",
        enum:["Admin", "User"],
    },
    accountVerified: {
        type: Boolean,
        default:false,
    },
    avatar: {
        public_id: String,
        url : String,
    },
    verficationCode: Number,
    verficationCodeExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateVerficationCode = async function () {
    function generateRandomFivesDigitNumber() {
        const firstdigit = Math.floor(Math.random() * 9) + 1;
        const remainingDigits = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, 0);
        return parseInt(firstdigit + remainingDigits);    
    }

    const verificationCode = generateRandomFivesDigitNumber();
    this.verficationCode = verificationCode;
    this.verficationCodeExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    return verificationCode;
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JET_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    return resetToken;

}


export const User = mongoose.model("User", userSchema);