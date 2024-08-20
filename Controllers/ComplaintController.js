import asyncHandler from 'express-async-handler';
import Complaint from '../Models/complaintModel.js';
import decodeToken from '../util/decodeToken.js';
import 'dotenv/config';
import Complaints from '../Models/complaintModel.js';



// @desc        File a new complaint
// @route       POST /request/
// @access      Public
const raiseComplaint = asyncHandler(async (req, res) => {
    try {
        const { email,wasteType, description,  pickupTime,pickupDate } = req.body;
        if(wasteType && description && pickupTime) {
            const newComplaint = new Complaint({
                email,
                wasteType,
                description,
                pickupDate,
                pickupTime,
                
                
            });
            
            console.log("problem");
            const filedComplaint = await newComplaint.save();
           
            if(filedComplaint) {
                res.status(201).json({
                    filedComplaint,
                    success: true,
                    message: "Complaint filed successfully!"
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'An error occurred while filing the complaint. Please try again.'
                });
            }
        } 
        else {
            res.status(400).json({
                success: false,
                message: 'Both, "Complaint Type" and "Description" are required!'
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
    
});

// @desc        Fetch all complaints
// @route       GET /request/all
// @access      Private/Admin
const allComplaints = asyncHandler(async (req, res) => {
    try {

        const complaints = await Complaint.find({ });
        res.status(200).json(complaints); // gives out an array of objects, each object contains a single complaint
    } catch(err) {
        res.status(400).json({ message: 'Error retrieving data. Please try again later.' });
        console.log("Error in retrieving data");
    }
});

// @desc        Update complaint status
// @route       UPDATE /request/update
// @access      Private/Admin
const updateStatus = asyncHandler(async (req, res) => {
    try {
        const bearerHeader = req.headers.authorization; 
        const { _id } = req.body
        const complaints = await Complaint.findOneAndUpdate({ _id}, { isResolved: true }, { new: true });
        
        res.status(200).json(complaints); 
        console.log(complaints);
    } catch(err) {
        res.status(400).json({ message: 'Error updating data. Please try again later.' });
        console.log("Error in updation: "+ res);
    }
});

// @desc        Fetch history of complaints for the logged in user
// @route       GET /api/complaints/history
// @access      Public
const complaintHistory = asyncHandler(async (req, res) => {
    try {
        const bearerHeader = req.headers.authorization; 
        const token = bearerHeader.split(' ')[1];
        const decoded = decodeToken(token);
        const filedBy = decoded.id;

        const complaints = await Complaints.find({ filedBy });

        if(complaints.length !== 0) {
            res.status(200).json({
                success: true,
                message: "Complaints fetched successfully!",
                complaints
            })
        }
        else {
            res.status(204).json({
                success: true,
                message: 'No complaints found.'
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch complaints, please try again later"
        })
    }
});

export {
    raiseComplaint,
    allComplaints,
    complaintHistory,
    updateStatus
};