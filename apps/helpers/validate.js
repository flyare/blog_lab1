module.exports = {
    checkEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    checkPasswrd: function (pass, repass) {
        if ((pass.trim().length > 0) && (repass.trim().length > 0) && (pass === repass)) {
            return true;
        }

        return false;
    }
}