const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isavailable: {
        type: Boolean,
        default: true
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
