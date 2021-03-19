const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        address: {type: String, required: true},
        phone: {type: Number, required: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        type: {type: String, required: true}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;