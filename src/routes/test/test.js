const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    console.log('Test reached.');
    res.json({'message':'We are in test'});
})

module.exports = router;