const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const bcrypt = require('bcryptjs')

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

// router.get('/login', (req,res) => res.send('login'))


// router.get('/register', (req,res) => res.send('register'))


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



router.post("/register", async(req,res)=>{
    const {name, email, password} = req.body;
    try {
        if (!name || !email || !password){
            res
            .status(400)
            .json({error: "Please fill all fields"});
        } else {
            const user  = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                }
            });
            //Hash password
            bcrypt.genSalt(10, (err,salt) => 
            bcrypt.hash(user.password, salt, (err, hash) =>{ 
                if(err) throw err;
                //Set password to hashed
                user.password = hash;
                user.save()
                .then( user => {
                    res.redirect('/login').json(user)
                })
                
            }))

            // res.status(200).json(user);
        }   
        // Hash Password
        

    } catch (error){
        console.log(error);
        res.status(500);
    }
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