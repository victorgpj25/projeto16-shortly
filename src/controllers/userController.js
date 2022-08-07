import {userRepository} from "../repositories/userRepository.js"

export async function getUserData (req, res) {
    const userId = res.locals.userId

    const {rows: userData} = await userRepository.getUserDataQuery(userId)

    const {rows: shortenedUrls} = await userRepository.getUserUrlsQuery(userId)

    const userDataBody = {
        id: userData[0].id,
        name: userData[0].name,
        visitCount: userData[0].visitCount,
        shortenedUrls
    }

    res.status(200).send(userDataBody)
}

export async function getRanking (req, res) {
    const {rows: rankingBody} = await userRepository.getRankingQuery()

    res.status(200).send(rankingBody)
}