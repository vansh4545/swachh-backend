import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    description: String,
    wasteType: String,
    pickupDate: Date,
    pickupTime: String,
    isResolved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Request', requestSchema);
