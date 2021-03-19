const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const userslist = require('../../models/User');
const tokenModel = require('../../models/token');



//Adding user into MongoDB 
router.post('/add', async (req,res) => {
    try
    {
        //check if user email is already in the database
        let user1 = await userslist.findOne({email: req.body.email});
        if(user1)
        {
            return res.status(400).json({error: [{msg: 'user already exists'}]})
        }
        else
        {
            const newuser = new userslist({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                type: req.body.type
            });
            
            //hash the password
            const salt = await bcrypt.genSalt(10);
            newuser.password = await bcrypt.hash(req.body.password, salt);
            
            //Save the user
            const nUser = await newuser.save();
            
            console.log("User Added");
            res.send(nUser);
            res.end();   
        }    
    }
    catch (err) 
    {
        res.status(500).send('Server Error'+err);
    }
});

router.post('/login', async (req, res) => {
 
    //Checking email for login
    const loginuser= await userslist.findOne({email:req.body.email});
    if(!loginuser)
    {
       return res.send("No Such User Found");
    }
    
    //checking password for login
    const Userpassword = await bcrypt.compare(req.body.password, loginuser.password);
    
    if(!Userpassword)
    {
        return res.status(400).send("Incorrect Password");

    }
    else
    {
        //Generate Token
        const payload = {
            user : {
                email: loginuser.email,
                firstname: loginuser.firstname,
                address: loginuser.address,
                type: loginuser.type
            }
        };
       
        const token = jwt.sign(payload, config.get('jwtsecret'), {
                algorithm: 'HS256',
                expiresIn: 30000});

        console.log("Successfully Logged In");
        res.send(loginuser);
        // res.send("Successfully Logged In. Token = " + JSON.stringify(token));

         //Updating Token
         try 
         {
             var tokenResponse = token;
             console.log("Res: "+tokenResponse);
             const newtoken = await tokenModel.findById("60550d40a983b881121c33a1");
 
             newtoken.token = tokenResponse;
 
             const nToken = await newtoken.save();
             
         }
         catch (err) {
             res.status(500).send('Server Error');
         }

    }

});

module.exports = router;