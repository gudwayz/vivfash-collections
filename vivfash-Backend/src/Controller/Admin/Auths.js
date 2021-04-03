const { Jwt } = require('jsonwebtoken');
const User = require('../../Models/user')
const env = require('dotenv');

env.config();


exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'Admin already exist '
            })
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString(),
                role: "admin"
            });

            _user.save((error, data) => {
                if (error) return res.status(400).json({
                    message: 'Something ent wrong'
                })
                if (data) return res.status(200).json({
                    message: 'Admin created successfully ......!'
                })
            })
        })

}


exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({
                error
            });
            if (user) {
                if ((user.authenticate(req.body.password)) && user.role === 'admin') {
                    const token = Jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, {
                        expiresIn: '3h'
                    });
                    const { _id, firstName, lastName, fullName, role } = user;
                    res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, fullName, role }
                    })
                } else {
                    return res.status(400).json({
                        message: 'invalid password'
                    });
                }

            } else {
                res.status(400).json({
                    message: 'something went wrong'
                })
            }

        })
}