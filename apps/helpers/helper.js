var bcryptjs = require("bcryptjs");
var config = require("config");
var saltRound = config.get("saltRound");

function hashPassword(password) {
    var salt = bcryptjs.genSaltSync(saltRound);
    var hash = bcryptjs.hashSync(password, salt);

    return hash;
}

module.exports = {
    hashPassword: hashPassword
}