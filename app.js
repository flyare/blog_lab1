var express = require('express'),
    controllers = require(__dirname + "/apps/controllers"),
    config = require("config"),
    bodyParser = require("body-parser"),
    port = config.get("server.port"),
    app = express();

app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static folder
app.use("/", express.static(__dirname + "/public"));

//Route controller
app.use(controllers);

app.listen(port, function () {
    console.log("Server run at port", port);
});