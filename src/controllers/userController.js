import {userRepository} from "../repositories/userRepository.js"

export async function getUserData (req, res) {
    const userId = res.locals.userId

    const {rows: userData} = await userRepository.getUserDataQuery(userId)

    const {rows: shortenedUrls} = await userRepository.getUserUrlsQuery(userId)

    const userDataBody = {
        id: userData.id,
        name: userData.name,
        visitCount: userData.visitCount,
        shortenedUrls
    }

    res.status(200).send(userDataBody)
}

export async function getRanking (req, res) {

    const {rows: rankingBody} = await userRepository.getRankingQuery(userId)

    res.status(200).send(rankingBody)
}