const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

const app = express();
//app.use(express.json())

//Connection DB
mongoose.connect('mongodb://127.0.0.1:27017/smartEdu-db')
     .then(() => console.log('Connected!'))
     .catch((err) => console.log(err));

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);

//Port
const port = 3000;
app.listen(port, () => {
     console.log(`Example app listening on port ${port}!`)
});
