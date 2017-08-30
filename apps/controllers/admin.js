var express = require("express");
var validate = require("../helper/validate")
var route = express.Router();
var user_md = require("../models/user");

route.get("/", function (req, res) {
    res.json("this is admin page");
});

route.get("/signup", function (req, res) {
    res.render("signup", {data: {error: false, message: ""}});
});

route.post("/signup", function (req, res) {
    var user = req.body;
    
     if (!validate.checkEmail(user.email)) {
         res.render("signup", {data: {error: true, message: "Email is inconrect!"}})
     }

     if (!validate.checkPasswrd(user.passwd, user.repasswd)) {
        res.render("signup", {data: {error: true, message: "Password is inconrect!"}})
     }

     var userDb = {
         email: user.email,
         password: user.passwd,
         first_name: user.firstname,
         last_name: user.lastname
     };

     var result = user_md.addUser(userDb);

     result.then(function(data){
        res.json("Insert sussecc!");
     }).catch(function (err) {
        res.render("signup", {data: {error: true, message: err}});
     })     
})

module.exports = route;