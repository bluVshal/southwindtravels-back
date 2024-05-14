const db = require('../../db');
const config = require('../../config');
const { createHash } = require ("crypto");

async function postNewUser(newUser){
    let message = 'Error in creating new user';
    if(newUser != null && Object.keys(newUser).length > 0){
        const getResult = await db.query(`SELECT userId FROM users ORDER BY userId DESC LIMIT 1`); // get the id of the newest user created
        let newUserId = 1;
        if(getResult[0] != null){
            newUserId = JSON.parse(JSON.stringify(getResult))[0].userId + 1;
        }
        const oldPassword = newUser.password;
        const newPassword = createHash("SHA256").update(oldPassword).digest("hex");
        const result = await db.query(
            `INSERT INTO users 
            (userId, username, password, lastlog, isLocked, isActive, isAdmin, uFirstName, uLastName, useremail) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [
                newUserId, 
                newUser.username, 
                newPassword, 
                newUser.lastlog, 
                0,
                1,
                newUser.isAdmin, 
                newUser.uFirstName, 
                newUser.uLastName,
                newUser.userEmail
            ]
        );
                
        if (result.affectedRows) {
            message = 'New user created successfully';
        }
    }
    
    return {message};
}

module.exports = {
    postNewUser
};