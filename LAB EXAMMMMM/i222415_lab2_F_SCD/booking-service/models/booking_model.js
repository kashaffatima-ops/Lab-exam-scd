const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true,
    },
    startdate:{
        type: Date,
        required: true
    },
    enddate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        default: 'Active'
    },
    carid:{
        type: String,
        required: true
    },

});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;