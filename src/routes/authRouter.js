
import express from "express"
import { signUp, signIn } from "../controllers/authController.js"
import { signUpMiddleware, signInMiddleware } from "../middlewares/authMiddleware.js"

const authRouter = express.Router()

authRouter.post("/signup", signUpMiddleware, signUp)
authRouter.post("/signin", signInMiddleware, signIn)

export default authRouter