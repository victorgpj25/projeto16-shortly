import express from "express"
import { getUserData, getRanking } from "../controllers/userController.js"
import { getUserDataMiddleware } from "../middlewares/userMiddleware.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const userRouter = express.Router()

userRouter.get("/users/me", verifyToken, getUserDataMiddleware, getUserData )
userRouter.get("/ranking", getRanking)

export default userRouter