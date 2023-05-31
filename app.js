const express = require('express');
const app = express();
const ejs = require('ejs');

//Template Engine
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));

//Routes
app.get('/', (req, res) => {
     res.status(200).render('index', {
          page_name: "index"
     })
});
app.get('/about', (req, res) => {
     res.status(200).render('about', {
          page_name: "about"
     })
});
//Port
const port = 5000;
app.listen(port, () => {
     console.log(`Example app listening on port ${port}!`)
});