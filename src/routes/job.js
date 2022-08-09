const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const { userInfo } = require('os');


// Get all job lists
// router.get("/", async(req, res)=>{

//     const joblisting = await prisma.job.findmany({
//         select: {
            
//             // 'jobid': userinfo.email,
//             // 'title': userinfo.name,
//             // 'category': userinfo.password,
//             // 'region':,
//             // 'payType':,
//             // 'payRate':,
//             // 'postDate':,
//             // 'dueDate':,

//         }
//     })  
//     res.send('working')

// })


router.post("/", async(req, res)=>{
    const samplejob1 = {
        title: "find a delivery person",
        category: "delivery",
        region: "North York",
        payType: "Flat",
        payRate: "25",
        postDate: new Date().toISOString(),
        dueDate: "Aug 27, 2022",
        user: User
    }  

    const test = await prisma.job.create({
        data: {
            'title': samplejob1.title,
            'category': samplejob1.category,
            'region': samplejob1.region, 
            'payType': samplejob1.payType,
            'payRate': samplejob1.payRate,
            'postDate':samplejob1.postDate,
            'dueDate':samplejob1.dueDate,
            'user': samplejob1.user

        }
    })  
    res.send(test)
    console.log(test)
})

module.exports = router;

// Get a job list with matched ID
// Post a job into the job listings
// Delete a job with matched ID on the job listings
