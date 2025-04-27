import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './database/db.js';
import {errorMiddleware} from './middlewares/errorMiddlewars.js'
import authRouter from './routes/auth.routers.js'
import expressFileUpload from 'express-fileupload';
import UserRouter from "./routes/userRouter.js";
import { removeUnverifiedAccounts } from './services/removeUnverifiedAccount.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

config({path: './config/config.env'});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", UserRouter);


removeUnverifiedAccounts();
connectDB();


app.use(errorMiddleware);