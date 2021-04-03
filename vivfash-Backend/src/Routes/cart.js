const express = require('express');
const { requireSignin } = require('../common-middleware');
const { userMiddleware } = require('../common-middleware');
const { addItemToCart } = require('../Controller/cart');


const router = express.Router();


router.post('/user/cart/addItem', requireSignin, userMiddleware, addItemToCart);


module.exports = router;