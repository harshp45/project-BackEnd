const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MenuSchema = new mongoose.Schema({

    itemname : { type : String , required: true},
    image: {type: String, required: true},
    location: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true}

});

const Menu = mongoose.model('menu', MenuSchema);

module.exports = Menu;