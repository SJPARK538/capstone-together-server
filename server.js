

const express = require('express');
const fs = require('fs');
const db = require("./src/config/db")
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;


// config(app);
const jobRoute = require('./src/routes/job');
const userRoute = require('./src/routes/user');




const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/job', jobRoute);
app.use('/user', userRoute);






app.listen(port, () => {
  console.log(`connected to port ${port}`);
});