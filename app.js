var express = require('express'),
    controllers = require(__dirname + "/apps/controllers"),
    config = require("config"),
    bodyParser = require("body-parser"),
    app = express();

app.use(controllers);

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, function () {
    console.log("Server run at port", config.get("server.port"));
})