const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGODB_URI;

const Product = require('./models/productModel')
const Customer = require('./models/customerModel')
const Order = require('./models/orderModel')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

//--------------------------------------------------------------------//
//                                                                    //
// Accessing and manipulating PRODUCTS COLLECTION                     //
//                                                                    //
//--------------------------------------------------------------------//

// Get all product

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Fetch a product by id

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Add a new product

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//--------------------------------------------------------------------//
//                                                                    //
// Accessing and manipulating Customers Collection                    //
//                                                                    //
//--------------------------------------------------------------------//

// Fetch all customers

app.get('/customers', async(req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Fetch a customer by email

app.get('/customers/:email', async(req, res) =>{
    try {
        const {email} = req.params;
        const customer = await Customer.findOne({ email });
        
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Add a new customer

app.post('/customers', async(req, res) => {
    try {
        const customer = await Customer.create(req.body)
        res.status(200).json(customer);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update customers using emaill as a unique key

app.put('/customers/:email', async(req, res) => {
    try {
        const { email } = req.params;
        const updatedCustomer = await Customer.findOneAndUpdate({ email }, req.body, { new: true });
        // If customer is not found in the database
        if (!updatedCustomer) {
            return res.status(404).json({ message: `Cannot find any customer with email ${email}` });
        }
        res.status(200).json(updatedCustomer);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// delete a customer by email

app.delete('/customers/:email', async(req, res) =>{
    try {
        const {email} = req.params;
        const customer = await Customer.findOneAndDelete({ email }, req.body, { new: true });

        if(!customer){
            return res.status(404).json({message: `cannot find any customer with email: ${email}`})
        }
        res.status(200).json(customer);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//--------------------------------------------------------------------//
//                                                                    //
// Accessing and manipulating ORDERS COLLECTION                     //
//                                                                    //
//--------------------------------------------------------------------//

// Get all orders

app.get('/orders', async(req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get order by orderNumber
app.get('/orders/:orderNumber', async(req, res) =>{
    try {
        const {orderNumber} = req.params;
        const order = await Order.findOne({ orderNumber });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



// Add a new Order

app.post('/orders', async(req, res) => {
    try {
        // Generate order number (you can implement your own logic here)
        const orderNumber = generateOrderNumber();

        // Create a new order document
        const order = new Order({
            ...req.body,
            orderNumber: orderNumber // Assign the generated order number
        });

        // Save the order document to the database
        await order.save();

        // Send the response with the created order
        res.status(200).json(order);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// Function to generate order number
function generateOrderNumber() {
    // Generate a random 6-digit order number
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// update order by OrderNumber

app.put('/orders/:orderNumber', async(req, res) => {
    try {
        const { orderNumber } = req.params;
        const updatedOrder = await Order.findOneAndUpdate({ orderNumber }, req.body, { new: true });
        // If order is not found in the database
        if (!updatedOrder) {
            return res.status(404).json({ message: `Cannot find any order with order number: ${orderNumber}` });
        }
        res.status(200).json(updatedOrder);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// delete an order by OrderNumber

app.delete('/orders/:orderNumber', async(req, res) =>{
    try {
        const {orderNumber} = req.params;
        const order = await Order.findOneAndDelete({ orderNumber }, req.body, { new: true });

        if(!order){
            return res.status(404).json({message: `cannot find any order with order number: ${orderNumber}`})
        }
        res.status(200).json(order);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

console.log(uri)
mongoose.set("strictQuery", false)
mongoose.connect(uri)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})
