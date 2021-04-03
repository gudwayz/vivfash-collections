const {check, validationResult} = require('express-validator')

exports.validateSignupRequest= [
    check('firstName')
    .notEmpty()
    .withMessage('first Name is required'),
    check('lastName')
    .notEmpty()
    .withMessage('Last Name is required'),
    check('email')
    .isEmail()
    .withMessage('Valid email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 xters long'),


];

exports.validateSigninRequest= [
 check('email')
    .isEmail()
    .withMessage('Valid email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 xters long'),

];

exports.isvalidate=(req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg});
    }
   next()
}