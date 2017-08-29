var express = require("express");
var route = express.Router();

route.get("/", function (req, res) {
    res.json("this is admin page");
});

route.get("/signup", function (req, res) {
    res.render("signup", {data: {}});
})

module.exports = route;