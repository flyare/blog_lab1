var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

function addUser(user) {
    if(user){
        defer = q.defer();
        var query = conn.query('INSERT INTO users SET ?', user, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
};

function getUserByEmail(user) {
    if (user) {
        defer = q.defer();
        var query = conn.query('SELECT * FROM `users` WHERE ?', {email: user.email}, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
}

module.exports = {
    addUser: addUser,
    getUserByEmail: getUserByEmail
}