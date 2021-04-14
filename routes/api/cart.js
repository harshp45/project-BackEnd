const express = require('express');

let cartlist = require('../../models/Cart');

const auth = require('../../middleware/auth');

const router = express.Router();


//list Cart based on location
router.get('/list', auth, async (req,res) => 
{
    try
    {
        const CartDb = await cartlist.find();
        res.send(CartDb);
    }
    catch (err)
    {
        res.status(500).send('Server Error');
    }
});


//Adding the data using POSTMAN
router.post('/add', auth, async (req,res) => 
{
    try
    {
        console.log(req.body);
        const newCart = new cartlist({
            itemname: req.body.itemname,
            image: req.body.image,
            location: req.body.location,
            price: req.body.price,
            sellername: req.body.sellername,
            sellerEmail: req.body.sellerEmail,
            category: req.body.category,
            quantity: req.body.quantity
        });

        const nCart = await newCart.save();
        res.send(nCart);
        res.end(); 
    }
      
    catch (err) 
    {
        res.status(500).send('Server Error'+err);
    }

});


//deleting the record using "/:id"
router.delete('/delete', auth, async (req,res) => 
{
    try
    {
        const CartDB = await cartlist.findByIdAndRemove({ _id: req.body.id});
        
        res.send("Record Deleted: "+"\n"+JSON.stringify(CartDB)); 
    }
    catch (err)
    {
        res.status(500).send('Server Error');
    }
});

module.exports = router;