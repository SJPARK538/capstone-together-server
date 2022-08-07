const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

// sign up
router.get("/", async(req, res)=>{
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
    console.log(test)
})



module.exports = router;