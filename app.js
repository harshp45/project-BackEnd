const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const connectDB = require('./config/connectDB');
const orderRoute = require('./routes/api/orders');
const menuRoute = require('./routes/api/menus');
const userRoute = require('./routes/api/users');


//Connect to DB
connectDB();


//middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

//Set a middleware to parse data
app.use(express.json());

//routes
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);
app.use('/api/menu', menuRoute);


module.exports = app;