var express = require("express");
var validate = require("../helpers/validate")
var route = express.Router();
var user_md = require("../models/user");
var helper = require("../helpers/helper")

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
         password: helper.hashPassword(user.passwd),
         first_name: user.firstname,
         last_name: user.lastname,
         created_at: Date.now().toString()
     };     

     var result = user_md.addUser(userDb);

     result.then(function(data){
        res.redirect("/admin/signin");
     }).catch(function (err) {
        res.render("signup", {data: {error: true, message: err}});
     })     
})

route.get("/signin", function (req, res) {
    res.render("signin", {data: {error: false, message: ""}});
})

route.post("/signin", function (req, res) {
    var user = req.body;

    if (!validate.checkEmail(user.email)) {
        res.render("signin", {data: {error: true, message: "Email is inconrect!"}})
    }

    if (validate.checkRequire(user.password)) {
        res.render("signin", {data: {error: true, message: "Password is require."}})
    }

    //check user db now.
    
    var result = user_md.getUserByEmail(user);
    result.then(function(data){
        if (data.length > 0) {
            if(helper.comparePassword(user.password, data[0].password)) {
                req.session.user = data[0];                
                res.redirect("/admin");
            } else {
                res.render("signin", {data: {error: true, message: "Password incorrect."}});
            }    
        } else{
            res.render("signin", {data: {error: true, message: "Email incorrect."}});
        }                
     }).catch(function (err) {
        res.render("signin", {data: {error: true, message: err}});
     });
})

module.exports = route;