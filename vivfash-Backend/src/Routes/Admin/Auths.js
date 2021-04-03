const express = require('express');
const router = express.Router();

const { signup, signin } = require('../../Controller/admin/Auths')
const { validateSigninRequest, validateSignupRequest, isvalidate } = require('../../validators/auth')


router.post('/admin/signup', validateSignupRequest, isvalidate, signup);

router.post('/admin/signin', validateSigninRequest, isvalidate, signin);








module.exports = router;