const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Unique index for ensuring uniqueness of product names
        index: true // Index for frequent queries by product name
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true // Index for frequent queries by product category
    },
    image: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    }
);



const Product = mongoose.model('Product', productSchema);

module.exports = Product;
