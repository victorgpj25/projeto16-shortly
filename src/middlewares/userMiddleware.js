import {userRepository} from "../repositories/userRepository.js"


export async function getUserDataMiddleware (req, res, next) {
    const userId = res.locals.userId

    const {rows: userExists} = await userRepository.getUserDataQuery(userId)

    if (!userExists.length) {
        return res.sendStatus(404)
    }

    
    next();
}


