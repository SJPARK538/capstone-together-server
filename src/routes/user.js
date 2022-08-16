const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

// SIGN UP -CREATE A SAMPLE USER
// router.post("/", async(req, res)=>{
//     const userinfo = {
//         email: "abc@test.com",
//         name: "sejin park",
//         password: "default"
//     }  

//     const test = await prisma.user.create({
//         data: {
//             'email': userinfo.email,
//             'name': userinfo.name,
//             'password': userinfo.password

//         }
//     })  
//     res.send(test)
// })



// CREATE A USER
router.post("/", async(req,res)=>{
    const {name, email, password} = req.body;
    const user  = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        }
    })
    res.json(user);
})



// GET USER LISTS
router.get("/", async(req, res)=>{
    const users = await prisma.user.findMany({
        include: {job: true}
    });
    

    res.json(users);

})

// GET A SIGNEL USER INFORMATOIN BY ID
router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
    });
    res.json(user)
})


// UPDATE USER INFORMATION
router.put("/", async(req, res)=>{
    const {id, job, email} = req.body
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            job: job,
            email: email
        }
    })
    res.json(updatedUser);
})

// DELETE A USER BY ID 
router.delete("/:id", async(req, res)=>{
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(id)

        }
    })
    res.json(deletedUser)
})

module.exports = router;