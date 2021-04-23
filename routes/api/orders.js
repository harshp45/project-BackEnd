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
            sellerLocation:req.body.sellerlocation,
            items: req.body.items,
            totalprice: req.body.totalprice
        });

        const nOrder = await newOrder.save();
        res.send(nOrder);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'patelharsh235027@gmail.com',
              pass: 'Harsh@1234'
            }
          });

        var mailOptions = {
            from: req.body.selleremail,
            to: req.body.customeremail,
            subject: 'Order Confirmation Mail by Homestyle Delicacies',
            html:`<h1>Homestyle Delicacies</h1>
            <h3>Thanks for ordering, ${req.body.customer}</h3>
            <p>This is an auto generated response to your placed order.</p>
            <p>Please do not reply to this email.</p>
            <hr/>
            <p>Here's your receipt for the order.</p><br>
            <h1>Total: CA$${req.body.totalprice}</h1>
            <hr/><br>
            <p>Order Items: </p><h3>${req.body.items}</h3>
            <hr/><br>
            <h2>Your ordered from Homestyle Delicacies (${req.body.sellerLocation})</h2><br>
            <p><b>Delivered to your registered address</b></p>
            <p>${req.body.customerAddress}</p><br>
            <p>Thank You,</p>
            <p><b>Homestyle Delicacies</b></p> `
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
            OrderDB.sellerLocation = req.body.sellerlocation,
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