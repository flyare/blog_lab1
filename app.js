var express = require('express'),
    controllers = require(__dirname + "/apps/controllers"),
    config = require("config"),
    bodyParser = require("body-parser"),
    app = express();

app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

app.use(controllers);

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

//Static folder
app.use("/", express.static(__dirname + "/public"));

app.listen(3000, function () {
    console.log("Server run at port", config.get("server.port"));
});