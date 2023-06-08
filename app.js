const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Db Connection
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db').
catch(error => handleError(error));

//Template Engine
app.set("view engine", "ejs");

//Global Variable
global.userIN = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
}));


//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

//Port
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});