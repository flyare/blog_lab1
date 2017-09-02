var express = require("express");
var validate = require("../helpers/validate")
var route = express.Router();
var user_md = require("../models/user");
var post_md = require("../models/post");
var helper = require("../helpers/helper");

route.get("/", function (req, res) {
    var promise = post_md.getAllPost();
    promise.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        }
        res.render("admin/dashboard", { data: data });
    }).catch(function (error) {
        var data = {
            message: "Could not get data from database.",
            error: true
        }
        res.render("admin/dashboard", { data: data });
    })
});

route.get("/signup", function (req, res) {
    res.render("signup", { data: { error: false, message: "" } });
});

route.post("/signup", function (req, res) {
    var user = req.body;

    if (!validate.checkEmail(user.email)) {
        res.render("signup", { data: { error: true, message: "Email is inconrect!" } })
    }

    if (!validate.checkPasswrd(user.passwd, user.repasswd)) {
        res.render("signup", { data: { error: true, message: "Password is inconrect!" } })
    }

    var userDb = {
        email: user.email,
        password: helper.hashPassword(user.passwd),
        first_name: user.firstname,
        last_name: user.lastname,
        created_at: Date.now().toString()
    };

    var result = user_md.addUser(userDb);

    result.then(function (data) {
        res.redirect("/admin/signin");
    }).catch(function (err) {
        res.render("signup", { data: { error: true, message: err } });
    })
})

route.get("/signin", function (req, res) {
    res.render("signin", { data: { error: false, message: "" } });
})

route.post("/signin", function (req, res) {
    var user = req.body;

    if (!validate.checkEmail(user.email)) {
        res.render("signin", { data: { error: true, message: "Email is inconrect!" } })
    }

    if (validate.checkRequire(user.password)) {
        res.render("signin", { data: { error: true, message: "Password is require." } })
    }

    //check user db now.

    var result = user_md.getUserByEmail(user);
    result.then(function (data) {
        if (data.length > 0) {
            if (helper.comparePassword(user.password, data[0].password)) {
                req.session.user = data[0];
                res.redirect("/admin");
            } else {
                res.render("signin", { data: { error: true, message: "Password incorrect." } });
            }
        } else {
            res.render("signin", { data: { error: true, message: "Email incorrect." } });
        }
    }).catch(function (err) {
        res.render("signin", { data: { error: true, message: err } });
    });
});

route.get("/post/new", function (req, res) {
    res.render("admin/post/new", { data: { error: false } });
});

route.post("/post/new", function (req, res) {
    var post = req.body;

    if (validate.checkRequire(post.title)) {
        return res.render("admin/post/new", {data: {error: true, message: "Title is require field."}});
    }

    if (validate.checkRequire(post.author)) {
        return res.render("admin/post/new", {data: {error: true, message: "Author is require field."}});
    }

    if (validate.checkRequire(post.content)) {
        return res.render("admin/post/new", {data: {error: true, message: "Content is require field."}});
    }

    var postDb = {
        title: post.title,
        author: post.author,
        content: post.content,
        created_at: new Date()
    }

    var result = post_md.addPost(postDb);
    result.then(function (data) {
        return res.redirect("/admin");
    }).catch(function (error) {
        return res.render("admin/post/new", {data: {error: true, message: "Could not save data."}});
    })
})

module.exports = route;