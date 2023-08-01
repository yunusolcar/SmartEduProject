const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config()
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Db Connection
mongoose.connect(process.env.mongoUrl).
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
  store: MongoStore.create({
    mongoUrl: process.env.mongoUrl
  })
}));

//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


//Port
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));