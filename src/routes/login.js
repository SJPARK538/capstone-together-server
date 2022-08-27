const router = require('express').Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { route } = require('./job');


// router.get('/login', (req, res) =>{
//     res.json({
//         message: 'login success'
//     })
// })

// router.post('/login',verifyToken, (req,res) => {
//     res.json({
//         message: 'login success'
//     })
// } )


// router.post ("/", (req, res) =>{
//     //mock user
//     const user = {
//         id: 99,
//         email: 'testlogin@gmail.com',
//         password:'test'
//     }

//     jwt.sign({user: user}, 'secretkey', (err,token) => {
//         res.json({
//             token
//         });
//     })
// })

module.exports = router;