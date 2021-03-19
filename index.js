const express = require('express');
const app = express()
const userRoute = require('./routes/api/users');
const menuRoute = require('./routes/api/menus');
const orderRoute = require('./routes/api/orders');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const bodyParser = require('body-parser')

//Connect to DB
connectDB();
const port = process.env.PORT || 5000
app.use(cors());

//middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Set a middleware to parse data
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/menu', menuRoute);
app.use('/api/order', orderRoute);

app.listen(port, console.log('Server is Ready'));