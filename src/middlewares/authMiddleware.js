import { signUpSchema, signInSchema } from "../schemas/authSchema.js"
import authRepository from "../repositories/authRepository.js"


export async function signUpMiddleware(req, res, next) {
    const { email } = req.body;

    const emailAlreadyInUse = await authRepository.checkEmailQuery(email)

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

