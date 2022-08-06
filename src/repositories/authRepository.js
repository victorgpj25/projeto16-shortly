import connection from "../databases/postgres.js"

async function checkEmailQuery (email) {
	return connection.query(
        'SELECT * FROM users WHERE email=$1',
        [email]
    );
}

async function signUpQuery (name, email, password) {
    return connection.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email, password]
    );
}

export const authRepository = {
	checkEmailQuery,
    signUpQuery
}