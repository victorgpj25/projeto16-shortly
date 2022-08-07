import connection from "../databases/postgres.js"


async function getUserDataQuery (userId) {
    return connection.query(
        `SELECT users.id, users.name, COALESCE(SUM(urls."visitCount"), 0) as "visitCount" 
        FROM users 
        LEFT JOIN urls ON urls."userId" = users.id 
        WHERE users.id=$1 
        GROUP BY users.id, users.name`,
        [userId]
    );
}

async function getUserUrlsQuery (userId) {
    return connection.query(
        'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId"=$1',
        [userId]
    );
}

async function getRankingQuery () {
    return connection.query(
        `SELECT users.id, users.name, COUNT(urls.id) as "linksCount" , COALESCE(SUM(urls."visitCount"), 0) as "visitCount" 
        FROM users 
        LEFT JOIN urls ON urls."userId" = users.id 
        GROUP BY users.id, users.name 
        ORDER BY "visitCount" DESC 
        LIMIT 10`
    );
}

export const userRepository = {
    getUserDataQuery,
    getUserUrlsQuery,
    getRankingQuery
}
