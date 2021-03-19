const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new mongoose.Schema({
    
    customer: {type: String, required: true},
    seller: {type: String, required: true},
    customerAddress: {type: String, required: true},
    items: [String],
    itemquantity: [Number],
    totalprice: {type: Number, required: true},
    date: { type: Date, default: Date.now }    

});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;