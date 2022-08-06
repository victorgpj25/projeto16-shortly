import { signUpSchema, signInSchema } from "../schemas/authSchema.js"
import {authRepository} from "../repositories/authRepository.js"
import jwt from "jsonwebtoken"


export async function signUpMiddleware(req, res, next) {
    const { email } = req.body;

    const { rows: emailAlreadyInUse } = await authRepository.checkEmailQuery(email)

    if (emailAlreadyInUse.length) {
        res.status(409).send({errorMessage: "Este email já esá sendo usado"})
        return
    }

    const validation = signUpSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        res.status(422).send({error: validation.error.details})
        return
    }

    next();
}

export function signInMiddleware(req, res, next) {

    const validation = signInSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        res.status(422).send({error: validation.error.details})
        return
    }
    
    next();
}

export async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) {
        res.status(401).send({errorMessage: "Falha na autenticação, faça login e tente novamente"})
        return 
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        res.locals.userId = tokenData.userId
    } catch {
        res.status(401).send({errorMessage: "Falha na autenticação, faça login e tente novamente"})
        return
    }
  
    next()
}

