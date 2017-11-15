// User Information App - Web Server

// Create a Node.js application that is the beginning of a user management system.
// Your users are all saved in a "users.json" file, and you can currently do the following:
// - search for users
// - add new users to your users file.
// - get your starter file here: users.jsonView in a new window

// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.

// Part 1
// Create two more routes:
// - route 2: renders a page that displays a form which is your search bar.
// - route 3: takes in the post request from your form, then displays matching users on a new page. 
// Users should be matched based on whether either their first or last name contains the input string.

// Part 2
// Create two more routes:
// - route 4: renders a page with a form with three inputs on it (first name, last name, and email)
// that allows you to add new users to the users.json file.
// - route 5: takes in the post request from the 'create user' form, then adds the user to the users.json file. 
// Once that is complete, redirects to the route that displays all your users (from part 0).

const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, () => { console.log("Listening") })
app.set("view engine", "pug")


app.get("/", (req, res, next) => {
    fs.readFile('users.json', 'utf8', function(err, data) {
        var obj = JSON.parse(data);
        console.log(obj)

        res.render("index", {
            title: "Users",
            user: "Rik",
            obj: obj
        })
    })
})

app.post("/user", function(req, res, next) {
    fs.readFile('users.json', 'utf8', function(err, data) {
        var obj = JSON.parse(data);
        console.log(obj)

        console.log(req.body.firstname)
        console.log(req.body.lastname)
        console.log(req.body.email)

        var isFound = false
        for (var i = 0; i < obj.length; i++) {
            if (req.body.firstname === obj[i].firstname || req.body.lastname === obj[i].lastname || req.body.email === obj[i].email) {
                res.render("user", {
                    user: obj[i].firstname,
                    lastname: obj[i].lastname,
                    email: obj[i].email
                })
                isFound = true
                break;
            }
        }
        if (!isFound) {
            res.redirect("/")
        }
    })
})

app.get("/searchbar", (req, res, next) => {
    res.render("searchbar")
})

app.get("/user", (req, res, next) => {
    res.render("user")
})

app.get("/signup", (req, res, next) => {
    fs.readFile('users.json', 'utf8', function(err, data) {
        var add = JSON.parse(data);
        res.render("signup", { add: add })
    })
})

app.post("/signup", (req, res, next) => {

    fs.readFile('users.json', 'utf8', function(err, data) {
        if (err) {
            console.log("ERROR")
        }
        var add = JSON.parse(data);
        var newUser = req.body

        add.push(newUser)
        let newJSON = JSON.stringify(add)
        fs.writeFile("users.json", newJSON, function(err, data) {
            if (err) {
                console.log("Error")
            }
          	else(res.redirect("/"))

        })
    })
})