const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password:{
        type: String,
        required: [true, 'password cannot be blank']
    }
});

module.exports = mongoose.model('User',userSchema);