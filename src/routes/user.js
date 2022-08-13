const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

// sign up
router.post("/", async(req, res)=>{
    const userinfo = {
        email: "abc@test.com",
        name: "sejin park",
        password: "default"
    }  

    const test = await prisma.user.create({
        data: {
            'email': userinfo.email,
            'name': userinfo.name,
            'password': userinfo.password

        }
    })  
    res.send(test)

})

// get information

// router.post("/", async(req,res)=>{
//     const {name, email, password} = req.body;
//     const user  = await prisma.user.create({
//         data: {
//             name: name,
//             email: email,
//             password: password,
//         }
//     })
//     res.json(user);
// })

// // all users list
// router.get("/", async(req, res)=>{
//     const users = await prisma.user.findMany();
//     res.json(users);
// })

// router.put("/", async(req, res)=>{
    
// })


// router.delete("/", async(req, res)=>{
    
// })

module.exports = router;