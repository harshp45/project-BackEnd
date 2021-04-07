const express = require('express');

let orderlist = require('../../models/Order');

var nodemailer = require('nodemailer');

const auth = require('../../middleware/auth');

const router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'patelharsh235027@gmail.com',
      pass: 'Harsh@1234'
    }
  });

  

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
            customer: req.user.firstname,
            seller: req.body.seller,
            customerAddress: req.user.address,
            items: req.body.items,
            itemquantity: req.body.itemquantity,
            totalprice: req.body.totalprice
        });

        const nOrder = await newOrder.save();
        res.send(nOrder);

        var mailOptions = {
            from: 'patelharsh235027@gmail.com',
            to: 'harshpatel235027@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'Order Confirmed'
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
           
            OrderDB.customer = req.user.firstname,
            OrderDB.seller = req.body.seller,
            OrderDB.customerAddress = req.user.address,
            OrderDB.items = req.body.items,
            OrderDB.itemquantity = req.body.itemquantity,
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