const User = require('../models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
};

exports.loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({
            email
        });
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    //User Session
                    req.session.userID = user._id;
                    res.status(200).redirect("/users/dashboard")
                } else {
                    res.status(400).send("incorrect password")
                }
            });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        })
    }
};

exports.logoutUser = (req, res) => {
    if (req.session.userID) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({
        _id: req.session.userID
    })
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user
    })
};