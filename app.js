const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoutes');

const app = express();

//Connection DB
mongoose.connect('mongodb://127.0.0.1:27017/smartEdu-db')
     .then(() => console.log('Connected!'))
     .catch((err) => console.log(err));

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));

//Routes
app.use('/', pageRoute);
//app.use('/course/courseRoute');

//Port
const port = 5000;
app.listen(port, () => {
     console.log(`Example app listening on port ${port}!`)
});