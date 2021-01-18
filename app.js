//getting access to express dependencies
const express = require("express");
//"path" => default
const path = require("path");
const userData = require("./usersdata.json");
const movieData = require("./moviedata.json");

const port = 3000;

//invoking express function
const app = express();

//setting view engine as ejs
app.set("view engine", "ejs");
//setting a default "views/" path to custom path
app.set("views", path.join(__dirname, "/views"));

//setting up static files
app.use(express.static(path.join(__dirname, "public")));

//getting request and sending back the response
app.get("/users/:name", (req, res) => {
    //destructuring req.params
    const {name} = req.params;
    //accessing data from JSON using params
    const data = userData[name];
    //render the user file to browser, "views/" => default path for view engine 
    if(data){
        res.render("user", {...data}); //using spread operator to access every single element from an object
    }
    else{
        res.render("404");
    }
})

app.get("/movies/:categories", (req, res) => {
    const {categories} = req.params;
    const data = movieData[categories];
    if(data){
        res.render("movie", {...data});
    }
    else{
        res.render("404");
    }
})

//starting server and listening to the port
app.listen(port, () => {
    console.log(`listening to localhost:${port}`);
})