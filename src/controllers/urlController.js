import urlRepository from "../repositories/urlRepository.js"
import { nanoid } from "nanoid"


export async function shortenUrl (req, res) {
    const { url } = req.body;
    const userId = res.locals.userId

    const shortUrl = nanoid()

    try {
        await urlRepository.shortenUrlQuery(userId, url, shortUrl)
    } catch {
        return res.sendStatus(500)
    }

    const shortUrlBody = {shortUrl}
    
    res.status(201).send(shortUrlBody);
}

export async function getUrlById (req, res) {
    const { id } = req.params

    const { rows: urlBody } = await urlRepository.getUrlByIdQuery(id)

    if (!urlBody.length) {
        return res.sendStatus(404)
    }

    res.status(200).send(urlBody[0]);
}

export async function openShortUrl (req, res) {
    res.redirect(res.locals.url);
}

export async function deleteUrl (req, res) {
    const { id } = req.params

    await urlRepository.deleteUrl(id)

    res.sendStatus(204);
}



