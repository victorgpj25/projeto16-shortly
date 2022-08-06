import express from "express"
import { shortenUrl, getUrlById, openShortUrl, deleteUrl } from "../controllers/urlController.js"
import { shortenUrlMiddleware, getUrlByIdMiddleware, openShortUrlMiddleware, deleteUrlMiddleware } from "../middlewares/urlMiddleware.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const urlRouter = express.Router()

urlRouter.post("/urls/shorten", verifyToken, shortenUrlMiddleware, shortenUrl )
urlRouter.get("/urls/:id", getUrlByIdMiddleware, getUrlById )
urlRouter.get("/urls/open/:shortUrl", openShortUrlMiddleware, openShortUrl )
urlRouter.delete("/urls/:id", verifyToken, deleteUrlMiddleware, deleteUrl )

export default urlRouter