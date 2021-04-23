const express = require('express');
const app = express();
var fs = require('fs');
var path = require('path');

let menulist = require('../../models/Menu');

const auth = require('../../middleware/auth');

const router = express.Router();

//set up multer for storing uploaded files
var multer = require('multer');
 
 

// create storage properties
const storage = multer.diskStorage({
    destination: "./public/photos/",
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
// set the upload location 
const upload = multer({ storage: storage });

 

// add static to the photos upload folder
app.use(express.static("public"));

//list menu based on location
router.get('/list', auth, async (req,res) => 
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

//list menu based on location
router.post('/listbymenu', auth, async (req,res) => 
{
    try
    {
        const MenuDb = await menulist.find({location: req.body.location});
        res.send(MenuDb);   
    }
    catch (err)
    {
        res.status(500).send('Server Error');
    }
});


//Adding the data using POSTMAN
router.post('/add', upload.single('image'), auth, async (req,res) => 
{
    try
    {
        console.log(req.body);
        const newMenu = new menulist({
            itemname: req.body.itemname,
            image:req.body.image,
            image:req.file.filename,
            location: req.body.location,
            price: req.body.price,
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
router.delete('/delete', auth, async (req,res) => 
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
router.put('/update',  upload.single('image'), auth, async (req,res) => 
{
    try
    {
        const MenuDB = await menulist.findById(req.body.id);
           
            MenuDB.itemname = req.body.itemname,
            MenuDB.image = req.file.filename,
            MenuDB.location = req.body.location,
            MenuDB.price = req.body.price,
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