// require('dotenv').config()
// import config from "./src/config/viewEngine"


const express = require('express');
const fs = require('fs');
const db = require("./src/config/db")
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;


// config(app);

const jobboardRoute = require('./src/routes/jobboard');
const jobpostingRoute = require('./src/routes/jobposting');
const userRoute = require('./src/routes/user');




const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/jobboard', jobboardRoute);
app.use('/jobposting', jobpostingRoute);
app.use('/user', userRoute);






app.listen(port, () => {
  console.log(`connected to port ${port}`);
});