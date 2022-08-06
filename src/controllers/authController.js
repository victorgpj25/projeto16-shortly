import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authRepository from "../repositories/authRepository.js"

export async function signUp (req, res) {
    const { name, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    await authRepository.signUpQuery(name, email, passwordHash)

    res.sendStatus(201);
}

export async function signIn (req, res) {
    const { email, password } = req.body;

    const { rows: userInArray } = authRepository.checkEmailQuery(email)

    const user = userInArray[0]

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // token expires in 24 hours

        res.status(200).send(token)
    } else {
        res.sendStatus(401)
    }
}

