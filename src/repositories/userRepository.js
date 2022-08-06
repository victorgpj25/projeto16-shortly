import connection from "../databases/postgres.js"


async function getUserDataQuery (userId) {
    return connection.query(
        `SELECT users.id, users.name, COUNT(urls.id) as "visitCount" 
        FROM users 
        JOIN urls ON urls."userId" = users.id 
        WHERE users.id=$1`,
        [userId]
    );
}

async function getUserUrlsQuery (userId) {
    return connection.query(
        'SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId"=$1',
        [userId]
    );
}

async function getRankingQuery (userId) {
    return connection.query(
        `SELECT us.id, us.name, COUNT(urls.id) as "linksCount" , SUM(urls."visitCount") as "visitCount" 
        FROM users 
        LEFT JOIN urls ON urls."userId" = users.id 
        WHERE users.id=$1 
        GROUP BY urls."userId"
        ORDER BY "visitCount" 
        LIMIT 10`,
        [userId]
    );
}

export const userRepository = {
    getUserDataQuery,
    getUserUrlsQuery,
    getRankingQuery
}
