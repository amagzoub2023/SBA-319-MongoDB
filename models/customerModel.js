const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true // Index for frequent queries by first name
    },
    lastName: {
        type: String,
        required: true,
        index: true // Index for frequent queries by last name
    },
    email: {
        type: String,
        required: true,
        unique: true, // Unique index for ensuring uniqueness of email addresses
        index: true // Index for frequent queries by email
    },
    phone: {
        type: String,
        required: true,
        index: true // Index for frequent queries by phone number
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String }
    },
    // Other fields as needed
});


const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

