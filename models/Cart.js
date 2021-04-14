const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CartSchema = new mongoose.Schema({

    itemname : { type : String , required: true},
    image: {type: String, required: true},
    location: {type: String, required: true},
    price: {type: Number, required: true},
    sellername: {type: String, required: true},
    sellerEmail: {type: String, required: true},
    category: {type: String, required: true},
    quantity:{type: Number, required: true}

});

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;