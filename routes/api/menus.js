const express = require('express');
var fs = require('fs');
var path = require('path');

let menulist = require('../../models/Menu');

const router = express.Router();

//set up multer for storing uploaded files
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

//list menu based on location
router.get('/list', async (req,res) => 
{
    try
    {
        const MenuDb = await menulist.find();
        res.send(MenuDb);
    }
    catch (err)
    {
        res.status(500).send('Server Error');
    }
});


//Adding the data using POSTMAN
router.post('/add',upload.single('image'), async (req,res) => 
{
    try
    {
        console.log(req.body);
        const newMenu = new menulist({
            itemname: req.body.itemname,
            image:{
                data: fs.readFileSync('D:/Education/Seneca/Winter 2021/Capstone Project/Coding/project-backend/uploads/' + req.file.filename),
                contentType: 'image/png'
            },
            location: req.body.location,
            price: req.body.price,
            sellername: req.body.sellername,
            category: req.body.category
        });

        const nMenu = await newMenu.save();
        res.send(nMenu);
        res.end(); 
    }
      
    catch (err) 
    {
        res.status(500).send('Server Error'+err);
    }

});


//deleting the record using "/:id"
router.delete('/delete', async (req,res) => 
{
    try
    {
        const MenuDB = await menulist.findByIdAndRemove({ _id: req.body.id});
        
        res.send("Record Deleted: "+"\n"+JSON.stringify(MenuDB)); 
    }
    catch (err)
    {
        res.status(500).send('Server Error');
    }
});


//Update the record by ID using postman
router.put('/update', async (req,res) => 
{
    try
    {
        const MenuDB = await menulist.findById(req.body.id);
           
            MenuDB.itemname = req.body.itemname,
            MenuDB.image = req.body.image,
            MenuDB.location = req.body.location,
            MenuDB.price = req.body.price,
            MenuDB.sellername = req.body.sellername,
            MenuDB.category = req.body.category
        
    
            const nMenu = await MenuDB.save();
            res.send(nMenu);
            res.end();
    }
    catch(err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;