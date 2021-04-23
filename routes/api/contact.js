const express = require('express');

var nodemailer = require('nodemailer');

const router = express.Router();


router.post('/sendMail', async (req,res)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'noreplyhomestyle@gmail.com',
          pass: 'Homestyle@123'
        }
      });

    var mailOptions = {
        from: 'noreplyhomestyle@gmail.com',
        to: 'contact.homestyledelicacies@gmail.com',
        subject: 'Customer Query',
        html:`<p>Hello,</p><br>

        <p>A customer has contacted us on the following information. Kindly, please contact them back soon.</p><br>

        <p>Customer Name: <b>${req.body.name}</b></p><br>
        <p>Customer Email: <b>${req.body.email}</b></p><br>
        <p>Customer Query: <b>${req.body.query}</b></p><br>

        <p>Thanks,</p>
        <p><b>Homestyle Delicacies</b></p>`
      };

    //Mailing Service
    transporter.sendMail(mailOptions, function(error, info){
        if (error) 
        {
          console.log(error);
        } else 
        {
          console.log('Email sent: ' + info.response);
          res.send("Customer has contacted!!!");
        }
      });

})

module.exports = router;