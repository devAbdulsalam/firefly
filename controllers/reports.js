import pool from '../db.js';
import { sendSMS } from '../utils/termii.js';

export const getDashboard = async (req, res) => {
	try {
		// Query to get total number of products
		const totalProductsResult = await pool.query(
			'SELECT COUNT(*) AS total FROM product'
		);
		const totalProducts = totalProductsResult.rows[0].total;
		// get 10 recent products
		const recentProducts = await pool.query(
			'SELECT * FROM product ORDER BY created_at DESC LIMIT 10'
		);
		const productImages = await pool.query('SELECT * FROM product_image');

		// Loop through products and add image URL based on matching ID
		const productsWithImages = recentProducts.rows.map((product) => {
			const matchingImage = productImages.rows.find(
				(image) => image.product_id === product.id
			);

			return {
				...product, // Spread existing product properties
				image: matchingImage ? matchingImage.url : null, // Add image URL if found, otherwise null
			};
		});
		// Query to get total number of users
		const totalUsersResult = await pool.query(
			'SELECT COUNT(*) AS total FROM users'
		);
		const totalUsers = totalUsersResult.rows[0].total;

		// Query to get total number of orders
		const totalOrdersResult = await pool.query(
			'SELECT COUNT(*) AS total FROM order'
		);
		const totalOrders = totalOrdersResult.rows[0].total;

		// Construct the response object
		const data = {
			totalProducts,
			totalUsers,
			totalOrders,
			products: productsWithImages,
		};

		// Send the response
		res.json(data);
	} catch (err) {
		res.status(500).send(err.message);
	}
};
export const reportEmergency = async (req, res) => {
	try {
		const { address, description, latitude, longitude } = req.body;
		const { id } = req.user;
		// const image = req.file;

		if (!address || !geolocation) {
			return res.status(400).send('Missing required fields');
		}
		const user = await pool.query(
			'SELECT  id, phone, username FROM users WHERE id = $1',
			[id]
		);

		const newReport = await pool.query(
			'INSERT INTO report (user_id, address, description ) VALUES ($1, $2, $3) RETURNING *',
			[id, address, description]
		);
		// get admin
		const admin = await pool.query(
			`SELECT  id, phone
			FROM users 
			WHERE role = $1`,
			['ADMIN']
		);
		const userPhone = user.rows[0]?.phone;
		const userName = user.rows[0]?.username;
		const adminPhone = admin.rows[0]?.phone;
		// console.log('userName', userName);
		// console.log('adminPhone', adminPhone);
		if (!adminPhone) {
			return res
				.status(400)
				.json({ message: 'No admin found. Please contact admin' });
		}
		// Send SMS
		const geolocation = `https://gps-coordinates.org/my-location.php?lat=${latitude}&lng=${longitude}`;
		const message = `Fire Incident Reported by ${userName}\nPhone: ${userPhone}\nAddress: ${address}\nGeolocation: ${geolocation}`;
		await sendSMS(message, adminPhone);
		// console.log('report', smsData);

		// Respond with success
		res.status(200).json({
			report: newReport.rows[0],
			message: 'Incident reported successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

export const getReports = async (req, res) => {
	try {
		// Implement get reports logic
		const inventoryReports = await pool.query('SELECT * FROM report');
		res.json(inventoryReports.rows);
	} catch (error) {
		console.log('getreport err', error);
		res.status(500).send(err.message);
	}
};

export const getSalesReports = async (req, res) => {
	try {
		const salesReports = await pool.query(
			'SELECT order_date::date, SUM(total) as total_sales FROM order GROUP BY order_date::date'
		);
		res.json(salesReports.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
};

export const getInventoryReports = async (req, res) => {
	try {
		const inventoryReports = await pool.query(
			'SELECT product_id, quantity FROM inventory'
		);
		res.json(inventoryReports.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
};
