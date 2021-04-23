const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CartSchema = new mongoose.Schema({

    itemname : { type : String , required: true},
    image: {type: String, required: true},
    location: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    user: {type: String, required: true}

});

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;