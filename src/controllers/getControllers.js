const db = require('../../db');
const config = require('../../config');

async function getAllUsers() {
    const rows = await db.query(`SELECT * FROM users`,[]);
    return { rows };
}

async function getUserWithParams(queryParams) {
    const rows = await db.query(`SELECT * FROM users WHERE uFirstName = ?`,[queryParams.uFirstName]);
    return { rows };
}

async function getUserById(queryParams) {
    const rows = await db.query(`SELECT * FROM users WHERE userId = ?`,[queryParams.id]);
    return { rows };
}



module.exports = { getAllUsers, getUserWithParams, getUserById };