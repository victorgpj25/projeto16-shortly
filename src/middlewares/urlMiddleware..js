import { urlSchema } from "../schemas/urlSchema.js"
import urlRepository from "../repositories/urlRepository.js"


export function shortenUrlMiddleware (req, res, next) {

    const validation = urlSchema.validate(req.body)

    if (validation.error) {
        res.status(422).send({error: validation.error.details})
        return
    }
    
    next();
}

export function getUrlByIdMiddleware (req, res, next) {
    const { id } = req.params

    if (!/^[1-9][0-9]*$/.test(id)) {
        return res.sendStatus(400)
    }
    
    next();
}

export function openShortUrlMiddleware (req, res, next) {
    const { shortUrl } = req.params

    const { rows: urlBody } = await urlRepository.openShortUrlQuery(shortUrl)

    if (!urlBody.length) {
        return res.sendStatus(404)
    }

    await urlRepository.addToVisitsCountQuery(shortUrl)

    res.locals.url = urlBody[0].url
    
    next();
}

export function deleteUrlMiddleware (req, res, next) {
    const { id } = req.params
    const userId = res.locals.userId

    if (!/^[1-9][0-9]*$/.test(id)) {
        return res.sendStatus(400)
    }

    const { rows: urlBody } = await urlRepository.getUrlByIdQuery(id)

    if (!urlBody.length) {
        return res.sendStatus(404)
    }

    const { rows: isUrlOwner } = await urlRepository.getUrlByIdUserIdQuery(id, userId)

    if (!isUrlOwner.length) {
        return res.sendStatus(401)
    }
    
    next();
}
