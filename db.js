const mysql = require('mysql2/promise');
const config = require('./config');
try {
        async function query(sql, params) {
            const connection = await mysql.createConnection(config.db);
            const [results, ] = await connection.execute(sql, params);
            return results;
        }
        module.exports = {
            query
        }
} catch (err) {
    console.log(err);
}
