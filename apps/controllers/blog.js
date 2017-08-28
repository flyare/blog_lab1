var express = require("express");
var route = express.Router();

route.get("/", function (req, res) {
    res.json("this is blog page");
});

module.exports = route;