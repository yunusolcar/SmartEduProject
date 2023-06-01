const express = require('express');
const app = express();
const ejs = require('ejs');
const pageController = require('./controllers/pageController')

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));

//Routes
app.get('/', pageController.getIndexPage);
app.get('/about', pageController.getAboutPage);

//Port
const port = 5000;
app.listen(port, () => {
     console.log(`Example app listening on port ${port}!`)
});