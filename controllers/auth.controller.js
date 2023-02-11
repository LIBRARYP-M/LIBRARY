const User = require("../models/User.model");
const mongoose = require("mongoose");


module.exports.home = (req, res, next) => {
    res.render("home");
};

module.exports.signup = (req, res, next) => {
    res.render("auth/signup");
};

module.exports.doSignup = (req, res, next) => {
    console.log("entro al signup")
    const renderWithErrors = (errors) => {
        console.log(errors);
        const userData = { ...req.body };
        delete userData.password;
        delete userData.repeatPassword;

        res.render("auth/signup", {
            user: userData,
            errors
        });
    }

    const { password, repeatPassword, username, email } = req.body;

    if(password && repeatPassword && password === repeatPassword) {
        User.findOne({ $or:  [ {username}, {email} ] })
        .then(user => {
            if(user) {
                renderWithErrors({ email: "username or email already in use" });
            } else {
                User.create(req.body)
                    .then(userCreated => {
                        console.log(userCreated);
                        res.redirect("/");
                    })
            };
        })
        .catch(err => {
            if(err instanceof mongoose.Error.ValidationError) {
                renderWithErrors("/signup", err.errors);
            } else {
                next(err);
            };
        });
    } else {
        renderWithErrors("/signup", { password: "passwords don't match" });
    };
}