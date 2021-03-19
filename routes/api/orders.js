const express = require('express');

let orderlist = require('../../models/Order');

const auth = require('../../middleware/auth');

const router = express.Router();

//Fetching orders Data from MongoDB
router.get('/list', auth, async (req,res) => 
{
    try
    {
        const OrderDB = await orderlist.findOne();
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