import mongoose from "mongoose";

// Schema design for complaints filed by users
const complaintSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    wasteType: { 
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    pickupTime: { // morning/afternoon/evening
        type: String,

        required: true
    },
    pickupDate: {
        type: Date,
        required: false,
    }
   , 
   isResolved: {
    type: Boolean,
    default: false
}
   
    // isResolved: {
    //     type: Boolean,
    //    // required: true,
    //     default: false
    // },
    // regDate: {
    //     type: Date,
    //     required: true
    // },
    // resolutionDate: {
    //     type: Date,
    //     default: null
    // },
   
    // adminRemarks: {
    //     type: String,
    //     trim: true
    // }
},
{
    timestamps: true
}
);

// Making complaint model
const Complaints = mongoose.model('Complaints', complaintSchema);

// Exporting Complaints model as default for this file
export default Complaints;