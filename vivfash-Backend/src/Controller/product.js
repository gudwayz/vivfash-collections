const Product = require('../Models/product');
const slugify = require('slugify')

exports.createProduct = (req, res) => {
    const {
        name,
        price,
        description,
        quantity,
        category,
    } = req.body;

    let productPicture = [];
    if (req.files.length > 0) {
        productPicture = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const _products = new Product({

        name: name,
        slug: slugify(name),
        price,
        description,
        quantity,
        category,
        productPicture,
        createdBy: req.user._id
    });

    _products.save((error, products) => {
        if (error) return res.status(400).json({ error });
        if (products) return res.status(201).json({ products });
    })



}