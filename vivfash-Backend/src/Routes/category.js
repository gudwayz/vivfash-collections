const express = require('express');
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');
const { requireSignin } = require('../common-middleware');
const { adminMiddleware } = require('../common-middleware');
const { getCategories, addCategory } = require('../Controller/category');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb) {
        cb(shortId.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });


router.post('/category/create', requireSignin, adminMiddleware, upload.single('catPicture'), addCategory);
router.get('/category/getCategory', getCategories);


module.exports = router;