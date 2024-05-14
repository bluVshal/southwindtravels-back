const express = require('express');
const router = express.Router();
const { getAllUsers, getUserWithParams, getUserById } = require('../../controllers/getControllers');
const { postNewUser } = require('../../controllers/postControllers');

router.get('/getallusers', async (req,res,next) => {
    try{
        if(!Object.keys(req.query).length){
            res.json(await getAllUsers());
        }
        else if(Object.keys(req.query)[0] === 'id'){
            res.json(await getUserById(req.query));
        }
        else if(Object.keys(req.query)[0] === 'uFirstName'){
            res.json(await getUserWithParams(req.query));
        }
    } catch(err){
        console.log('Error while getting users: ', err.message);
        next(err);
    }
});

router.get('/login', async (req, res, next) => {
    try {
        console.log(req.query);
       // res.json(await getUserPassword(req.query));
       res.send('Login in construction');

    } catch (err) {
        console.error(`Error while adding a new user `, err.message);
        next(err);
    }
});

router.post('/postnewuser', async (req, res, next) => {
    try {
        res.json(await postNewUser(req.query));
    } catch (err) {
        console.error(`Error while adding a new user `, err.message);
        next(err);
    }
});

module.exports = router;