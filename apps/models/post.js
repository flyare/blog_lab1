var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

function getAllPost() {
    defer = q.defer();
    var query = conn.query('SELECT * FROM posts', function (err, result) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(result);
        }
    });

    return defer.promise;
}

function addPost(post) {
    if (post) {
        defer = q.defer();
        var query = conn.query('INSERT INTO posts SET ?', post, function (err, result) {
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
    getAllPost: getAllPost,
    addPost: addPost
}