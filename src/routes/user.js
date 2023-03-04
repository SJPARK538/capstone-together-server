const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const bcrypt = require('bcryptjs');
// const jwt = require('../config/jwt'); not used
const { validationResult } = require('express-validator');
const {check} = require("express-validator")
const user = require('../controllers/authControl')
const auth = require('../config/auth') //not used
require('dotenv').config();



/////////////////CREATE A USER ON REGISTER FORM/////////////////
router.post('/register', [
    check("email", "Please provide a valid email address").isEmail(),
    check("password", "Please provide a password that is greater than 5 characters").isLength({min: 6})
], async(req,res) => {
    const {password, email, name } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10)
    

    // VALIDATE THE INPUT
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
        // req.flash("success_msg", "You are now Registered and can login")
        res.json(user)
    }
})


///////////////// LOGIN /////////////////
router.post('/login', user.login);

///////////////// GET USER LISTS /////////////////
router.get("/", async(req, res)=>{
    const users = await prisma.user.findMany({
        include: {job: true}
    });
    
    res.json(users);

})

///////////////// GET A SINGLE USER INFORMATOIN BY ID /////////////////
// router.get("/:id", async(req, res)=>{
//     const id = req.params.id;
//     const user = await prisma.user.findUnique({
//         where: {
//             id: Number(id)
//         },
//     });
//     res.json(user)
// })

router.get("/", auth, async (req, res) => {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        password: true,
      },
    });
    res.json(user);
  });




///////////////// UPDATE USER INFORMATION /////////////////
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

///////////////// DELETE A USER BY ID /////////////////
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