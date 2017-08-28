var express = require("express");
var route = express.Router();

route.use("/admin", require(__dirname + "/admin"));
route.use("/blog", require(__dirname + "/blog"));
route.get("/", function (req, res) {
    res.render("test");
})

module.exports = route;