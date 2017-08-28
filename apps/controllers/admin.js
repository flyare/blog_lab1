var express = require("express");
var route = express.Router();

route.get("/", function (req, res) {
    res.json("this is admin page");
});

module.exports = route;