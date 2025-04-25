import express from 'express';
import { register, verifyOTP, login, logout, getUser, forgotPassword, resetPassword, updatePassword } from '../controllers/authController.js';
import { log } from 'console';
import { isAuthenticated } from '../middlewares/authMiddlewares.js';
const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.get("/logout",isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/Update", isAuthenticated, updatePassword);



export default router;