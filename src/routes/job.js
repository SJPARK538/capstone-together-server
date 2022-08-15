const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const { userInfo } = require('os');

// CREATE A SAMPLE JOB LIST 
// router.post("/", async(req, res)=>{
//     const samplejob1 = {
//         title: "find a delivery person",
//         category: "delivery",
//         region: "North York",
//         payType: "Flat",
//         payRate: "25",
//         postDate: new Date().toISOString(),
//         dueDate: "Aug 27, 2022",
//         user_id: 1,
//         include: {
//             author: true
//         }
//     }
//     const test = await prisma.job.create({
//         data: {
//             'title': samplejob1.title,
//             'category': samplejob1.category,
//             'region': samplejob1.region, 
//             'payType': samplejob1.payType,
//             'payRate': samplejob1.payRate,
//             'postDate':samplejob1.postDate,
//             'dueDate':samplejob1.dueDate,
//             'user_id':samplejob1.user_id,
//             'author': samplejob1.author
//         }
//     })  
//     res.send(test)
// })


// Get all job lists
// router.get("/", async(req, res)=>{

//     const joblisting = await prisma.job.findmany({
//         select: {
            
//             'jobid': userinfo.email,
//             'title': userinfo.name,
//             'category': userinfo.password,
//             'region':,
//             'payType':,
//             'payRate':,
//             'postDate':,
//             'dueDate':,

//         }
//     })  
//     res.send('working')

// })

// CREATE A JOB 
router.post("/", async(req,res)=>{
    const {title, category, region, payType, payRate, postDate, dueDate} = req.body;
    const job  = await prisma.job.create({
        data: {
                        title: title,
                        category: category,
                        region: region, 
                        payType: payType,
                        payRate:payRate,
                        postDate: postDate,
                        dueDate: dueDate,
                        include: {author: true}
        }
    })
    res.json(user);
})


module.exports = router;

// Get a job list with matched ID
// Post a job into the job listings
// Delete a job with matched ID on the job listings
