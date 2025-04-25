import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "Best_Login_SignUp_Page",
    }).then(() =>{
        console.log("MongoDB connected successfully");
    }).catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
}