import express from 'express';
import {
	getDashboard,
	reportEmergency,
	getReports,
} from '../controllers/reports.js';
import auth from '../middlewares/auth.js';
const router = express.Router();

router.get('/dashboard', auth, getDashboard);
router.post('/', auth, reportEmergency);
router.get('/', auth, getReports);
// router.get('/sales-reports', getSalesReports);
// router.get('/inventory-reports', getInventoryReports);

export default router;
