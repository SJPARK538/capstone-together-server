const express = require('express');
const fs = require('fs');
const db = require("./src/config/db")
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || process.argv[2] || 8080;
// const flash = require('connect-flash')
// const session = require('express-session')


// config(app);
const jobRoute = require('./src/routes/job');
const userRoute = require('./src/routes/user');

const cors = require('cors');

app.use(cors());
app.use(express.json());




//Bodyparser
app.use(express.urlencoded({ extended: true}))
app.use(bodyParser.json())

// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUnitialized: true
// }))
// //Connect flash;
// app.use(flash())

//Global Vars
// app.use((req, res, next) => {
//   res.local.success_msg = req.flash('success-msg');
//   res.local.error_msg = req.flash('error-msg')
//   next();
// })

// Routes
app.use('/job', jobRoute);
app.use('/user', userRoute);


app.listen(port, () => {
  console.log(` 🚀 connected to port ${port}`);
});


