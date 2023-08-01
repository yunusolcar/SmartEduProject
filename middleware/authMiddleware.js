const User = require('../model/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userID)
        .then(user => {
            if (!user) {
                return res.redirect('/login')
            }
            next();
        }).catch(err => {
            console.log(err)
        })
};