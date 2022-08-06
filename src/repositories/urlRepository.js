import connection from "../databases/postgres.js"


async function shortenUrlQuery (userId, url, shortUrl) {
    return connection.query(
        'INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)',
        [userId, url, shortUrl]
    );
}

async function getUrlByIdQuery (id) {
    return connection.query(
        'SELECT id, "shortUrl", url FROM urls WHERE id=$1',
        [id]
    );
}

async function openShortUrlQuery (shortUrl) {
    return connection.query(
        'SELECT url FROM urls WHERE "shortUrl"=$1',
        [shortUrl]
    );
}

async function addToVisitsCountQuery (shortUrl) {
    return connection.query(
        'UPDATE url SET visitCount = visitCount + 1 WHERE "shortUrl"=$1',
        [shortUrl]
    );
}

async function getUrlByIdUserIdQuery (id, userId) {
    return connection.query(
        'SELECT * FROM urls WHERE id=$1 AND "userId"=$2',
        [id, userId]
    );
}

async function deleteUrl (id) {
    return connection.query(
        'DELETE FROM urls WHERE id=$1',
        [id]
    );
}



export const urlRepository = {
	shortenUrlQuery,
    getUrlByIdQuery,
    openShortUrlQuery,
    addToVisitsCountQuery,
    getUrlByIdUserIdQuery,
    deleteUrl
}