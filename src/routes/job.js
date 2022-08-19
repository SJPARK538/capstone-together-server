const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const { userInfo } = require('os');
const {DateTime} =require('luxon');


// CREATE A SAMPLE JOB LIST 
// router.post("/", async(req, res)=>{
//     const samplejob1 = {
//    {     // title: "find a delivery person",
//         category: "delivery",
//         region: "North York",
//         payType: "Flat",
//         payRate: "25",
//         postDate: new Date().toISOString(),
//         dueDate: "Aug 27, 2022",
//         user_id: 1,
//         include: {
//             author: true
//         }}
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


// CREATE A JOB 
router.post("/", async(req,res)=>{
    const {title, category, region, payType, payRate, postDate, dueDate, user_id} = req.body;
    console.log(DateTime.fromFormat(postDate, 'MM, dd,yyyy').toJSDate())
    console.log(DateTime.fromFormat(dueDate, 'MM, dd,yyyy').toJSDate())
    const job  = await prisma.job.create({
        data: {
                title: title,
                category: category,
                region: region, 
                payType: payType,
                payRate: payRate,
                postDate: DateTime.fromFormat(postDate, 'MM, dd,yyyy').toJSDate(),
                dueDate: DateTime.fromFormat(dueDate, 'MM, dd,yyyy').toJSDate(),
                author: {
                    connect: {id: user_id}
                }
            },
            include: {
                author: true
            }
    })
    res.json(job);
})


// GET JOB LISTS
router.get("/", async(req, res)=>{
    const {jobList} = req.body;
    const jobs = await prisma.job.findMany({
        data: jobList
    });
    res.json(jobs);

})

// GET A SINGLE JOB LIST BY jobID
router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    const job = await prisma.job.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(job)
})

// DELETE A SINGLE JOB LIST BY ID
router.delete("/:id", async(req, res)=>{
    const id = req.params.id
    const deletedJob = await prisma.job.delete({
        where: {
            id: Number(id)

        }
    })
    res.json(deletedJob)
})

module.exports = router;