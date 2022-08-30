const express = require('express');
const fs = require('fs');
const db = require("./src/config/db")
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || process.argv[2] || 8080;


// config(app);
const jobRoute = require('./src/routes/job');
const userRoute = require('./src/routes/user');
// const loginRoute = require('./src/routes/login');



const cors = require('cors');


app.use(cors());
app.use(express.json());


//Bodyparser
app.use(express.urlencoded({ extended: false}))


// Routes
app.use('/job', jobRoute);
app.use('/user', userRoute);
// app.use('/login', loginRoute);



app.listen(port, () => {
  console.log(` 🚀 connected to port ${port}`);
});


