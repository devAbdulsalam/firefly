import express from 'express';
import {
	getBooking,
	getBookings,
	createBooking,
	updateBooking,
	deleteBooking,
} from '../controllers/booking.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/', auth, getBookings);
router.get('/:id', auth, getBooking);
router.post('/', auth, createBooking);
router.patch('/:id', auth, updateBooking);
router.delete('/:id', auth, deleteBooking);

export default router;
