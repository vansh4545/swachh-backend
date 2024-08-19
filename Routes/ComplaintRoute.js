import express from 'express';
import {
    raiseComplaint,
    allComplaints,
    complaintHistory,
    updateStatus
} from '../Controllers/ComplaintController.js';


const router = express.Router();

router.route('/').post(raiseComplaint);
router.route('/all').get(allComplaints);
router.route('/update').patch(updateStatus);
router.route('/history').get(complaintHistory);

export default router;