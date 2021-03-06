const express = require('express');

let orderlist = require('../../models/Order');

var nodemailer = require('nodemailer');

const auth = require('../../middleware/auth');

const router = express.Router();



  

//Fetching orders Data from MongoDB
router.get('/list', auth, async (req,res) => 
{
    try
    {
        const OrderDB = await orderlist.find();
        res.send(OrderDB);
    }
    catch (err)
    {
        res.status(500).send('Server Error');
    }
});


//Adding the orders data into MongoDB
router.post('/add', auth, async (req,res) => {

    try
    {
        console.log(req.body);
        const newOrder = new orderlist({
            customer: req.body.customername,
            customerEmail: req.body.customeremail,
            customerAddress: req.body.customeraddress,
            items: req.body.items,
            totalprice: req.body.totalprice
        });

        const nOrder = await newOrder.save();
        res.send(nOrder);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'noreplyhomestyle@gmail.com',
              pass: 'Homefood@123'
            }
          });

        var mailOptions = {
            from: 'noreplyhomestyle@gmail.com',
            to: req.body.customeremail,
            subject: 'Order Confirmation Mail by Indian Cuisine',
            html:`<h1>Indian Cuisine</h1>
            <h3>Thanks for ordering, ${req.body.customername}</h3>
            <p>This is an auto generated response to your placed order.</p>
            <p>Please do not reply to this email.</p>
            <hr/>
            <p>Your order number is <b>F93DQA</b>, and is estimated to arrive in 45 mins.</p>
            <p>Here's your receipt for the order.</p><br>
            <h1>Total: CA$${req.body.totalprice}</h1>
            <hr/><br>
            <p>Order Items: </p><h3>${req.body.items}</h3>
            <hr/><br>
            <h2>Your order from Indian Cuisine</h2><br>
            <p><b>Payment Method</b></p>
            <p>You will be charged from the provided payment method after your order get delivered to you.</p><br>
            <p><b>Delivery Address:</b></p>
            <p>${req.body.customeraddress}</p><br>
            <p>Thank You,</p>
            <p><b>Indian Cuisine</b></p> `
          };

        //Mailing Service
        transporter.sendMail(mailOptions, function(error, info){
            if (error) 
            {
              console.log(error);
            } else 
            {
              console.log('Email sent: ' + info.response);
            }
          });

        res.end(); 
    }
      
    catch (err) 
    {
        res.status(500).send('Server Error'+err);
    }

});


//deleting the record using "/:id"
router.delete('/delete', auth, async (req,res) => {
    try
    {
        const OrderDB = await orderlist.findByIdAndRemove({ _id: req.body.id});
        
        res.send("Record Deleted: "+"\n"+JSON.stringify(OrderDB)); 
    }
    catch (err)
    {
        res.status(500).send('Server Error');
    }
});


//Update the orders data by ID
router.put('/update', auth, async (req,res) => {
    try
    {
        const OrderDB = await menulist.findById(req.body.id);
           
            OrderDB.customer = req.body.customername,
            OrderDB.customerEmail = req.body.customeremail,
            OrderDB.customerAddress = req.body.customeraddress,
            OrderDB.items = req.body.items,
            OrderDB.totalprice = req.body.totalprice
    
            const nOrder = await OrderDB.save();
            res.send(nOrder);
            res.end();
    }
    catch(err) 
    {
        res.status(500).send("Server Error");
    }
});

module.exports = router;