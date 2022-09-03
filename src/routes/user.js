const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('../config/jwt');
const { validationResult } = require('express-validator');
const {check} = require("express-validator")
require('dotenv').config();


// SIGN UP -CREATE A SAMPLE USER testing
// router.post("/", async(req, res)=>{
//     const userinfo = {
//         email: "",
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
// router.post("/register", async(req,res)=>{
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

router.post('/register', [
    check("email", "Please provide a valid email address").isEmail(),
    check("password", "Please provide a password that is greater than 5 characters").isLength({min: 6})
], async(req,res) => {
    const {password, email, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    

    //VALIDATE THE INPUT
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    // VALIDATE IF USER DOESN'T ALREADY EXIST
    const existUser = await prisma.user.findUnique({
        where: 
            {
                email: email
            }
    })

    if(existUser){
        res.status(400).json({
            "msg": "This user already exist"
        })
    } else if(!existUser) {
        const user  = await prisma.user.create({   
                    data: {
                        name: name,
                        email: email,
                        password: hashedPassword
                    }
                    
            
                })
                

                res.json(user)
    }

    // let hashedPassword = await bcrypt.hash(password, 10 )


})





// router.post("/register", async(req,res)=>{
//     const {name, email, password} = req.body;
//     try {
//         if (!name || !email || !password){
//             res
//             .status(400)
//             .json({error: "Please fill all fields"});
//         } else {
//             const user  = await prisma.user.create({
//                 data: {
//                     name: name,
//                     email: email,
//                     password: password,
//                 }
//             });
//             //Hash password
//             bcrypt.genSalt(10, (err,salt) => 
//             bcrypt.hash(user.password, salt, (err, hash) =>{ 
//                 if(err) throw err;
//                 //Set password to hashed
//                 user.password = hash;
//                 // Save user?
//                 // user.save()
//                 // .then( user => {
//                 //     res.redirect('/login').json(user)
//                 // })
//             }))
//             res.redirect('./login').json(user)
//         }   

//     } catch (error){
//         console.log(error);
//         res.status(500);
//     }
// })





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