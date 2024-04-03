const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    orderNumber: {
        type: String,
        required: true,
        index: true // Index for frequent queries by product order number
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer model
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' // Reference to the Product model
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    // Other fields as needed
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
