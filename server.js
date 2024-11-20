// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoURI = 'mongodb+srv://Esom:queenscollege@fullstack.ww3sl.mongodb.net/?retryWrites=true&w=majority&appName=Fullstack';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Define Mongoose Schemas and Models

// Menu Item Schema and Model
const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Cart Item Schema and Model (Optional - you can create a Cart model or just work with the client-side cart)
const cartItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});

// Order Schema and Model
const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  paymentMethod: String,
  items: [cartItemSchema], // An array of Cart items
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// API route to get the menu from MongoDB
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items', error: err });
  }
});

// API route to add an item to the cart (we're using in-memory storage here, but you can also save to DB if needed)
let cart = [];

// Add item to cart
app.post('/api/cart', async (req, res) => {
  const { id, name, price } = req.body;
  
  try {
    const menuItem = await MenuItem.findById(id);
    if (menuItem) {
      const cartItem = { ...menuItem._doc, quantity: 1 }; 
      cart.push(cartItem); 
      res.status(201).json({ message: 'Item added to cart', item: cartItem });
    } else {
      res.status(404).json({ message: 'Item not found in menu' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err });
  }
});

// API route to view the current cart
app.get('/api/cart', (req, res) => {
  res.json(cart);  
});

// API route to place an order
app.post('/api/orders', async (req, res) => {
  const { name, address, paymentMethod } = req.body;

  if (!name || !address || !paymentMethod) {
    return res.status(400).json({ message: 'All fields (name, address, payment method) are required' });
  }

  // Calculate the total price of the order
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Create an order document in MongoDB
  const order = new Order({
    customerName: name,
    address: address,
    paymentMethod: paymentMethod,
    items: cart,
    totalPrice: totalPrice
  });

  try {
    const savedOrder = await order.save();
    cart = []; 
    res.status(201).json({ message: 'Order placed successfully!', order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err });
  }
});

// API route to get all orders (admin or manager can use this)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err });
  }
});

// Serve the frontend (for simplicity, it's just a message here)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to our restaurant</h1><p>Use /api/menu to see the menu, /api/cart to view the cart, and /api/orders to place an order.</p>');
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
