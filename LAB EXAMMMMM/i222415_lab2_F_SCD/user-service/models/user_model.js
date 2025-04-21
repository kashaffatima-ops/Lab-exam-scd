const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    maxbooking: {
        type: Number,
        required: true,
        default: 0
    },
    maxbooking: {
        type: Number,
        required: true,
        default: 3

    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
