const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    catpicture: {
        type: String
    },
    parentId: { type: String }
}, { timiestamps: true });


module.exports = mongoose.model('Category', categorySchema)