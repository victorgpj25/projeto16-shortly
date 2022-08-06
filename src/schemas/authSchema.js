import joi from "joi"


const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$")).required(),
    confirmPassword: joi.string().required()
})

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})


export {signInSchema, signUpSchema}