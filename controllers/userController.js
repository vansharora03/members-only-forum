const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcrypt");

exports.sign_up_GET = async (req, res, next) => {
    res.render('sign-up', {title: "Sign Up"});
}

exports.sign_up_POST = [
    // Validation and sanitation
    body("first_name")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage("First name is required.")
        .bail()
        .isAlphanumeric()
        .withMessage("First name must contain valid characters."),
    body("last_name")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage("Last name is required.")
        .bail()
        .isAlphanumeric()
        .withMessage("Last name must contain valid characters."),
    body("username")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage("Username is required.")
        .bail()
        .isLength({min: 5})
        .withMessage("Username must be atleast 5 characters long."),
    body("password")
        .trim()
        .isLength({min: 1})
        .escape()
        .bail()
        .withMessage("Password is required.")
        .isLength({min: 8})
        .withMessage("Password must be atleast 8 characters long."),
    body("confirm_password")
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage("Please confirm your password.")
        .bail()
        .custom( (value, {req}) => {
            // Check if confirm password === password
            if (value !== req.body.password) {
                return false;
            }
            else {
                return true;
            }
        })
        .withMessage("Passwords must match."),
    async (req, res, next) => {
        // Extract validation errors
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            // There are errors
            res.render("sign-up", {user: req.body, error_list: errors.array()});
        }
        // There are no errors
        foundUser = await User.findOne({username: req.body.username})
        // If username is in use
        if (foundUser) {
            const errorsArray = errors.array();
            usernameTakenError = new Error("Username is already in use. Please choose another.");
            usernameTakenError.msg = "Username is already in use. Please choose another.";
            errorsArray.push(usernameTakenError);
            res.render("sign-up", {user: req.body, error_list: errorsArray});
        }
        // Else save the user

        // hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
            is_vip: false
        })
        try {
            user.save()
        } catch (err) {
            next(err)
        }
        res.redirect('/')
    }
]