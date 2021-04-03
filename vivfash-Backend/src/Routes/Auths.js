const express = require('express');
const router = express.Router();

const { signup, signin } = require('../Controller/Auths')
const { validateSigninRequest, validateSignupRequest, isvalidate } = require('../validators/auth')




router.post('/signup', validateSignupRequest, isvalidate, signup);

router.post('/signin', validateSigninRequest, isvalidate, signin);





module.exports = router;